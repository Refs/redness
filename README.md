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

