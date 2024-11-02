// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // // Use the console to output diagnostic information (console.log) and errors (console.error)
  // // This line of code will only be executed once when your extension is activated
  // console.log('Congratulations, your extension "switchenv" is now active!');

  // // The command has been defined in the package.json file
  // // Now provide the implementation of the command with registerCommand
  // // The commandId parameter must match the command field in package.json
  // const disposable = vscode.commands.registerCommand('switchenv.helloWorld', () => {
  // 	// The code you place here will be executed every time your command is executed
  // 	// Display a message box to the user
  // 	vscode.window.showInformationMessage('Hello World from SwitchEnv!');
  // });

  // context.subscriptions.push(disposable);

  const statusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  statusBar.command = "switchEnv.selectEnvironment";
  statusBar.text = `$(gear) SwitchEnv`;
  statusBar.show();

  context.subscriptions.push(
    vscode.commands.registerCommand("switchEnv.selectEnvironment", async () => {
      const envNames = vscode.workspace
        .getConfiguration("switchEnv")
        .get<string[]>("envNames", []);
      const selectedEnv = await vscode.window.showQuickPick(envNames, {
        placeHolder: "Select an environment",
      });

      if (!selectedEnv) {
        // User canceled
        return;
      }
      const ingoreFolderNames = vscode.workspace
        .getConfiguration("switchEnv")
        .get<string[]>("ignoreFolders", []);
      // Replace contents of each `.env` file in the monorepo
      const folders = vscode.workspace.workspaceFolders;
      if (folders) {
        for (const folder of folders) {
          await switchEnvironmentInFolder(
            folder.uri.fsPath,
            selectedEnv,
            ingoreFolderNames
          );
        }
        vscode.window.showInformationMessage(
          `Switched to ${selectedEnv} environment`
        );
      } else {
        vscode.window.showErrorMessage("No workspace folders found");
      }
    })
  );

  context.subscriptions.push(statusBar);
}

async function switchEnvironmentInFolder(
  folderPath: string,
  selectedEnv: string,
  ignoreableFolders: string[]
) {
  // Get custom configurations
  const envFolder = vscode.workspace
    .getConfiguration("switchEnv")
    .get<string>("envFolder", "env-presets");
  const envFilePattern = vscode.workspace
    .getConfiguration("switchEnv")
    .get<string>("envFilePattern", ".env");

  // Skip ignored folders
  if (ignoreableFolders.includes(path.basename(folderPath))) {
    return;
  }
  // Define paths for the .env file and the selected environment preset
  const envFilePath = path.join(folderPath, envFilePattern);
  const presetEnvPath = path.join(folderPath, envFolder, `${selectedEnv}.env`);

  // If both .env and preset files exist, replace .env with the preset file's content
  if (fs.existsSync(envFilePath) && fs.existsSync(presetEnvPath)) {
    const presetContent = fs.readFileSync(presetEnvPath, "utf-8");
    fs.writeFileSync(envFilePath, presetContent);
  }

  // Recursively apply to nested folders
  const subfolders = fs
    .readdirSync(folderPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => path.join(folderPath, dirent.name));

  for (const subfolder of subfolders) {
    await switchEnvironmentInFolder(subfolder, selectedEnv, ignoreableFolders);
  }
}

// This method is called when your extension is deactivated
export function deactivate() {}
