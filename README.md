# `.mbox` parser -> email list `.csv`

A very simple script for parsing `.mbox` files into a readable `.csv`, originally created for a guy on Facebook. If you have any issues or need assistance, please dm me on discord, I'm happy to provide advice: csmit195#4729

## Requirements
1. NodeJS LTS Latest - [Download  Installer](https://nodejs.org/en/download/)
2. Exported `.mbox` file from Gmail or the email client you use.

## Installation
1. Download the latest release from this Github
2. Export the downloaded release zip
3. Rename your exported `*.mbox` file to `mail.mbox`
4. Move the `mail.mbox` into the extracted folder
5. Open the config.json and edit it to match your needs. *(example config found below)*

If all was followed correctly, your folder layout should be:
```bash
.
├── index.js                # Main JS File (do not modify)
├── config.json             # Configuration File (edit this)
├── package.json            # NPM Package JSON (do not modify)
├── mail.mbox               # Exported .mbox file from Gmail.
└── README.md
```


## Usage
1. Open up `Command Prompt`
2. type `cd <your directory>` *(replace your directory with the full absolute path to the extracted directory)*
3. type `npm install`
4. type `node index.js`
5. Wait until the script has finished running and a `CSV` file has appeared in the extracted directory.

## Config
You only need to modify one of the config options, and that's the `my_emails` field.

### Single Email
```json
{
    "input": "mail.mbox",
    "output": "output.csv",
    "print_log": false,
    "ignore_sent": true,
    "ignore_draft": true,
    "my_emails": ["myownemail@gmail.com"]
}
```

### Multiple Emails
```json
{
    "input": "mail.mbox",
    "output": "output.csv",
    "print_log": false,
    "ignore_sent": true,
    "ignore_draft": true,
    "my_emails": ["myownemail@gmail.com", "email2@hotmail.com", "email@yourdomain.com"]
}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

The main contributions I'd be more accepting of are config additions and cleaner code. The source code currently isn't perfectly structured.

## License
[MIT](https://choosealicense.com/licenses/mit/)