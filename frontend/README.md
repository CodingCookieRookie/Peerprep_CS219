# PeerPrep User Frontend
We are using [React.ts](https://www.typescriptlang.org/docs/handbook/react.html), a TypeScript library for building user interfaces, for our frontend.
[React.ts](https://www.typescriptlang.org/docs/handbook/react.html) is very similar to [React.js](https://reactjs.org/).

Alternatively, you can look up on `README-React.md`, the default README file for React apps.

The only difference between React.ts and React.js is the language used, where React.ts aims to build applications **declaratively** with components. 

### Why choose react?
React is easy to learn and has many rich user interfaces. This smoothen the learning curves from starters and enables faster developments.
React is also the second most popular Frontend Development library among developers and has a strong community that provides support.


## Build Setup
For a detailed explanation of how things work, check out the [documentation](https://reactjs.org/).
```bash
# install dependencies
$ npm install

# serve with hot reload at [http://localhost:3000](http://localhost:3000)
$ npm start
```

## Main structure of PeerPrep User Frontend

Our main bulk of code is within the `src` folder and we focus on these 2 folders
- Pages 
- Components

We are using [React Bootstrap](https://github.com/react-bootstrap/react-bootstrap) as our UI framework.
It is a very powerful and easy to style framework. You can read more about React Bootstrap Components in the [documentation](https://react-bootstrap.github.io/).
We also made use of [Material UI](https://mui.com/) components for certain fancy components.

### `Pages`

This directory contains different folders, each containing the `.tsx` and `.css` file.
The `.tsx` file represents the page component rendered with the styling based in the `.css` files.
Each directory will represent a Page on its own, consisting of the component and its styling sheet.

### `Components`

This directory contains different folders, each containing a set of `.tsx` and `.css` file, similarly to Pages directory.
Each folder represents a set of reusable components, such as Popup Modals, Loading Screen and so on.

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

Ideally, we try not to overcrowd the page. We will separate each component of the page into its own TypeScript file along with the CSS styling file.

If in doubt, we highly recommend just create a component for each part of your page and import it into your page.
This makes your code cleaner and easier to read.

Should you need a different file structure and wish to explore more, you can check out more in the FAQ-structure [documentation](https://reactjs.org/docs/faq-structure.html).


## Others

### `assets`

The assets directory contains your uncompiled assets such as images, gifs or icons.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `public`

This directory contains the HTML file so you can tweak it.
For example, to set the page title. The `<script>` tag with the compiled code will be added to it automatically during the build process


More information about the usage of public folder in [documentation](https://create-react-app.dev/docs/using-the-public-folder/).

### `build`

This directory contains what we build when we run `npm run build`.
This creates the production build files stored in this directory.

More information about the usage of production build folder in  [documentation](https://create-react-app.dev/docs/production-build/).
