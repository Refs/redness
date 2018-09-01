# Red

## fix the scss inspect in angular cli 6 (issues: 9099)

### Global level scss

1 modify angular.json to add --extract-css, in 6.0 this argument is removed from ng serve

```json
// angular.json
 "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
           ---
          },
          "configurations": {
            "production": {
              ---
            },
            "serve": {
              "extractCss": true,
               ---
            }
          }
        },
```

2. hen change serve->options->browserTarget->project-name:build to project-name:build:serve

```json
"serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "open": true,
            "browserTarget": "<project-name>:build:serve"
          },
          "configurations": {
            "production": {
              ---
            }
          }
        }
```

3. run : ng serve --source-map


### Component level Scss

> You can temporarily fix this yourself editing changing the sourcemap option for both instances of postcss-loader in the following file
`./node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/styles.js` change `sourceMap: cssSourceMap` to `sourceMap: cssSourceMap ? 'inline' : false`

```ts
// line (201)
const rules = baseRules.map(({ test, use }) => ({
        exclude: globalStylePaths, test, use: [
            { loader: 'raw-loader' },
            {
                loader: 'postcss-loader',
                options: {
                    ident: 'embedded',
                    plugins: postcssPluginCreator,
                    sourceMap: cssSourceMap ? 'inline' : false
                }

```


## config the project structure

1. move everything fo appModule to a new directory `appModule` then change the path of app.module.ts

```ts
// main.ts

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/appModule/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

```


## integrate jquery and jquery plugin

1. integrate jquery

* jquery install

```bash
# install jquery
npm install -s jquery
# install @types/jquery
npm install --save-dev @types/jquery
```

* to import jquery in the angular.json file

> No need to configure angular.json any more. `But we still need to configure tsconfig.json currently`.
Import echarts theme files or other extension files in main.ts.  
> in  angular 6 we can straight to import file in component, and no need to import in angular.json

```js
// in angular.json 中
"scripts": [
  // "node_modules/jquery/dist/jquery.js",
],

```

* to config jquery types in `src/tsconfig.app.json`

```js
"compilerOptions": {
    "types": [
      "jquery"
    ]
  },

```
2. tsconfig.json: You need to map the jquery path to minified version of jquery in the compilerOptions of "tsconfig.json" in your project's root (this is important for AoT build):

```bash
{
  ...,
  "compilerOptions": {
    ...,
+    "paths": {
+      "echarts": ["node_modules/echarts/dist/jquery.min.js"]
+    }
  }
}
```

2. integrate jquery plugin

* Install the jquery plugin

```bash
npm install jquery-modal -s
```

* to import jquery in the `angular.json` file

```js
"scripts": [
  "node_modules/jquery/dist/jquery.js",
  "node_modules/jquery-modal/jquery.modal.min.js"
],

```

* Config the plugin declaration types

> if the typing.d.ts file is not exist, we have to touch one

```js
// in src/typing.d.ts 中

declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface JQuery {
  modal(options?:any, callback?:Function):any;
}
```

3. use the plugin in the component

> both the jquery and plugin have to be imported at start, or there will be no jquery object and jquery.model() method

```ts
import { Component, AfterViewInit } from '@angular/core';

// import jquery when we want to use in the component
import * as $ from 'jquery';
// import the jquery plugin , when we want to use plugin in the component

import 'jquery-modal';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'red';

  ngAfterViewInit() {
    $('div').attr('style', 'background: red;');
    $('#login-form').modal();
  }
}


```

## ng add

### use ng add to integrate @angular/material

1. `ng add` 

```bash

ng add @angular/material
```


2. use ng add to custom our schematics

> https://blog.kevinyang.net/2018/06/15/angular-schematics-ng-add/

## integrate ngrx/platform

1. repo : https://github.com/ngrx/platform

2. bash

```bash
npm install -s @ngrx/store @ngrx/effects @ngrx/router-store @ngrx/store-devtools @ngrx/entity @ngrx/schematics

```


## integrate echarts

1. install  (v4.0)

```bash
npm install echarts -S
npm install ngx-echarts -S
npm install @types/echarts -D

# or if you use yarn
yarn add echarts
yarn add ngx-echarts
yarn add @types/echarts -D

```

2. tsconfig.json: You need to map the echarts path to minified version of echarts in the compilerOptions of "tsconfig.json" in your project's root (this is important for AoT build):

```bash
{
  ...,
  "compilerOptions": {
    ...,
     "paths": {
       "echarts": ["node_modules/echarts/dist/echarts.min.js"]
     }
  }
}
```

## lazyloading module 404 router config 

1. the router config of lazyloading component 
> https://stackoverflow.com/questions/39713864/404-pages-and-lazy-loading-in-angular2

2. the 404 status of not found page
> https://blog.thecodecampus.de/angular-universal-handle-404-set-status-codes/
