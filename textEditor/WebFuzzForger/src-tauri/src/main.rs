use std::process::Command;
use tauri::Manager;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// #[tauri::command]
// fn execute_command(command: String, file_path: Option<String>) -> Result<String, String> {
//     let (program, args) = if cfg!(target_os = "windows") {
//         ("cmd", vec!["/C"])
//     } else {
//         ("sh", vec!["-c"])
//     };

//     let mut full_command = command;
//     if let Some(path) = file_path {
//         full_command.push_str(&format!(" \"{}\"", path));
//     }

//     let mut command = Command::new(program);
//     command.args(args).arg(full_command);

//     match command.output() {
//         Ok(output) => {
//             let stdout = String::from_utf8_lossy(&output.stdout).to_string();
//             let stderr = String::from_utf8_lossy(&output.stderr).to_string();

//             if !stderr.is_empty() {
//                 Ok(format!("{}Error:\n{}", stdout, stderr))
//             } else {
//                 Ok(stdout)
//             }
//         }
//         Err(e) => Err(format!("Failed to execute command: {}", e)),
//     }
// }

#[tauri::command]
fn execute_command(command: String, file_path: Option<String>) -> Result<String, String> {
    let output = if cfg!(target_os = "windows") {
        let mut args = vec!["/C", &command];
        if let Some(path) = file_path.as_deref() {
            args.push(path);
        }
        Command::new("cmd")
            .args(args)
            .output()
    } else {
        let mut full_command = command;
        if let Some(path) = file_path {
            full_command.push_str(" ");
            full_command.push_str(&path);
        }
        Command::new("sh")
            .arg("-c")
            .arg(full_command)
            .output()
    };

    output
        .map_err(|e| format!("Failed to execute command: {}", e))
        .and_then(|output| {
            let stdout = String::from_utf8_lossy(&output.stdout).to_string();
            let stderr = String::from_utf8_lossy(&output.stderr).to_string();

            if !stderr.is_empty() {
                Ok(format!("{}Error:\n{}", stdout, stderr))
            } else {
                Ok(stdout)
            }
        })
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, execute_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}