# SwitchEnv README

SwitchEnv is a Visual Studio Code extension designed to simplify the process of switching between different environment configurations in a project. This extension helps you quickly swap `.env` files with presets for various environments like `local`, `dev`, `qa`, `stage`, etc.. enabling smoother transition across project in the same workspace.

## Features

- **Environment Switching**: Easily switch between predefined environment configurations withing your project be it single project or monorepo.

- **Multiple Project Support**: Automatically identifies projects with .env files and applies selected environment presets to each.

- **Customizable Environments**: Add custom environment options (e.g. dev, qa, stage) in the extension settings (`switchEnv.envNames`).

- **Folder Ignoring**: Specify folders to ignore during environment switching, useful for skipping unnecessary directories (`switchEnv.ignoreFolders`).

- **Custom Environment Folder and Patterns**: Specufy a custom folder for environment presets and define pattern for environment files.

## Example Usage

1. Place environment preset files in an `environments` folder next to each .env file:

```
/projectA
    |--- .env
    |--- environments/
        |--- local.env
        |--- dev.env
        |--- qa.env
        |--- stage.env

```

2. Configure environment options and ignorable folders in extension settings (more below).
3. Click the **SwitchEnv** button in the status bar to select the environment or hit `cmd + shift + p` and search SwitchEnv hit enter. You will be prompted to select a environment from a list of environments you defined in `switchEnv.envNames` variable in `settings.json`. Select an environment from list and then the content of `.env` files will automatically updated with the selected preset values.

![Demo](https://github.com/rohitvishwakarma1819/SwitchEnv/raw/main/assets/switchEnv-demo.gif)

## Requirements

No special dependencies are required. Ensure that you have `.env` and `environments` files properly structured as described for optimal use.

## Extension Settings

SwitchEnv provides the follwing settings to customize behavior:

- `switchEnv.envNames`: Defines a list of environments available for switching. Default: `["local", "dev", "qa", "stage"]`.
- `switchEnv.ignoreFolders`: Specifies folders to ignore when switching environments. Useful for excluding non-environment-related folders in your project. Default: `["node_modules", "dist"]`.
- `switchEnv.envFolder`: Specifies the folder where environment presets files are stored. Default: `"environments"`.
- `switchEnv.envFilePattern`: Defines the pattern for environment files. Default: `".env"`.

## Release Notes

### 1.0.0

Initial release of SwitchEnv

# Suggesting Improvements

To file bugs, make feature requests, or to suggest other improvements, please use [github's issue tracker](https://github.com/rohitvishwakarma1819/SwitchEnv/issues)

<br>

# Want to support my work

1. [<img src = "https://github.com/rohitvishwakarma1819/SwitchEnv/raw/main/assets/buy-me-coffee.jpeg" width ="80">](https://www.buymeacoffee.com/rohitvish) [**Buy me a coffee! ☕️**](https://www.buymeacoffee.com/rohitvish)

2. Star this repository ⭐️⭐️⭐️

<br>

# Made with ♥️ by Rohit Vishwakarma
