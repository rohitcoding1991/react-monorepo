### Introduction

This project showing an example of Monorepo structure where two modules are used `application-framework` and `application-main` together for development purpose and `application-client` is used for the testing purpose for installing the uploaded package in the github registery.

- `application-framework` holds the component lib that can be use in the other react project.
- `application-main` is the react project initiated by using vite, useful in local testing using `npm link`.
- `application-client` is the react project initiated by using create-react-app and it is using the `@himanshu077/application-framework` as the dependency


### How to build and run locally

- Node.js version 20+ is required, Recommended to use 20.9.0+. Install using nvm.
- Go into the `application-framework` install the packages using npm install.
- Build the component library using command `npm run build`
- Use the command `npm run link` to create a symlink for the application-frameowork package to be used by the other project.
- Go into the `application-main` and install the packages using npm install.
- Consume the symlink by running the command `npm run link` in the `application-main`.
- Run the `application-main` by using command `npm run dev`.


### How to use the uploaded package
- Initialise any react project and do `npm i @himanshu077/application-framework` to install the package.
- Add the styles provided by the package using in the root file say `index.js`
```javascript
import "@himanshu077/application-framework/dist/styles.css";
```

- Import Button component and use it
```javascript
import { Button } from "@himanshu077/application-framework";

function App() {
  return (
    <div>
      <Button onClick={() => alert("Hello")}>Say Hello</Button>
    </div>
  );
}

export default App;

```

