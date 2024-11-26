# Start with cloning the git repo #
Run the following command in a terminal within your prefered directory. That is where the clone will be downloaded.
```bash
    git clone https://github.com/Onehealthpoint/Wizards.git
```
 
### Pull Latest Updates ###
Always pull the latest changes before starting work:
```bash
    git pull origin main
```

### Create a New Branch for Features ###
Create and switch to a new branch for their feature or fix:
```bash
    git checkout -b feature-name
```

### Commit Changes ###
After making changes, stage and commit them:
```bash
    git add .
    git commit -m "Description of the changes"
```

### Push to the Remote Branch ###
Push their changes to the remote repository
```bash
    git push origin feature-name
```

# Setup local environment #
```bash 
    cd Wizards
    npm install tailwindcss postcss-cli autoprefixer -D
    npx tailwind init tailwind.js --full
```

# Configure Postcss #
Create a file "postcss.config.js"
Add text:
```bash
    const tailwindcss = require('tailwindcss');
    module.exports = {
        plugins: [
            tailwindcss('./tailwind.js'),
            require('autoprefixer')
        ],
    };
```

# Assets Directory #
Create a directory "assets"
Create two files: "main.css", "tailwind.css"
Add following text to "tailwind.css":
```bash
    @import "tailwindcss/base"; 
    @import "tailwindcss/components"; 
    @import "tailwindcss/utilities";
```

# Configure App to build your css as you go #
Open "package.json"
Edit text:
```bash
    "scripts": {
        "start": "npx concurrently \"npm run watch:css\" \"react-scripts start\"",
        "build": "npm run build:css && react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject",
        "build:css": "postcss src/assets/tailwind.css -o src/assets/main.css",
        "watch:css": "postcss src/assets/tailwind.css -o src/assets/main.css --watch"
    },
```

Open "tailwind.js"
Edit text:
```bash
    mode: 'jit',
    content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
```

# Import css #
Delete all css files in the app and their imports(except "main.css" and "tailwind.css")
Import "main.css" in "index.js":
```bash
    import './assets/main.css';
```

# Run App #
Run the following command:
```bash
    npm start
```
# More changes may occur so please stay up to date. You may approach your team leader for any queries.
# Firebase, Routing, StateManagement is yet to be implemented.
