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

* In the router module
```ts

const routes: Routes = [
  {
    path: 'notfound',
    loadChildren: '../notfound/notfound.module#NotfoundModule',
  },
  {
    path: '**', redirectTo: '/notfound'
  }
];

```

* In the notfound module
```ts
const routes: Routes = [
  { path: '', component: formContainers.NotfoundComponent },
];
```

* In the lazyloading module
```ts
const routes: Routes = [
  {
    path: 'home',
    component: fromContainers.HomeComponent,
  },
  // the '' is in the last
  { path: '', pathMatch: 'full', redirectTo: 'home' },
];

```


2. the 404 status of not found page
> https://blog.thecodecampus.de/angular-universal-handle-404-set-status-codes/

## Ngrx : How to share store among modules (main module / feature module)

> every module has its own state branch, the component in the lazyloading module can easily select it's own branch state, But have can we select random state branch in the entire state tree

> we can create a watcher services which watcher the state branch of the module that we want to select, then when the branch change we can receive the notice given by the watcher service in the lazyloading module. That's great !

## rxjs

1. custom pipeable operators

```js
const pow = (p: number) => (source: Observable<number>) => source.pipe(map => n ** p);
// or 
const pow = (p: number) => {
  return ( source : Observable<number> ) => {
    return source.pipe(map = >n ** p)
  }
}

```

```js
source$.pipe(
  filter( x => x> 100),
  pow(3)
).subscribe( x => console.log(x) );

```

2. New Feature in 6.0

* New unhandled error behavior
  + Old and Busted: If an observable errors with no error handler  ... rethrow the error `synchronously`
  + New Hotness: If an observable errors with no error handler  ... rethrow the error `asynchronously`

  `badSource$.subscribe(nextFn, handleError, completeFn)`

* the rethrow the error `synchronously` could cause a bug

> https://stackblitz.com/edit/angular-rxjs-prod-interference-tyxcce?file=app/app.component.ts

```ts
import { Component, Injectable } from '@angular/core';
import { interval } from 'rxjs/observable/interval';
import { share, map, filter } from 'rxjs/operators';

@Injectable()
export class JeffCrossService {
  private _source$ = interval(100).pipe(
    map(() => Math.round(Math.random() * 100)),
    share()
  );

  getAmazingStuff() {
    return this._source$;
  }
}

@Component({
  selector: 'misko-comp',
  template: '<div>Misko: {{display$ | async}}</div>',
})
export class MiskoComponent<T> {
  display$ = this.service.getAmazingStuff().pipe(
    filter(value => value > 50)
  )
  
  constructor(private service: JeffCrossService) {}
}

@Component({
  selector: 'ladyleet-comp',
  template: '<div>{{display$ | async}}</div>',
})
export class LadyLeetComponent<T> {
  display$ = this.service.getAmazingStuff().pipe(
    filter(value => value < 50)
  )
  
  constructor(private service: JeffCrossService) {}
}

@Component({
  selector: 'shai-comp',
  template: '<div>{{display$ | async}}</div>',
})
export class ShaiComponent<T> {
  display$ = this.service.getAmazingStuff().pipe(
    filter(value => {
      if (value === 42) throw Error('haha');
      return true;
    })
  )
  
  constructor(private service: JeffCrossService) {}
}


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular 5';
}
```

  + What happended ?
    - JeffCrossService.getAmazingStuff() returns a shared (multicast) Observable
    - Multicasting loops over an array of Observers and notifies them all using a for-loop.
    - ShaiComponent synchronously throws an error if JeffCrossService emits the number 42.
    - if the synchronous error is unhandled , RxJS synchronously re-throws it. (If the synchronous error goes all the way down i the chain of observation and is unhandled or there is no error handler then it will be synchronously thrown)
    - which means javaScript unwinds the callstack looking for a try/catch to handle the error
    - This breaks the for-loop for the multicast and stops notifying observers
    - Misko is sad and doesn't get his data updates
  > Imaging if different teams developed these components and a separate team develop the service like figuring ot who is to blame for this problem it's a very very nasty bug to run across, unless you happen to have me working with you . 

  + xjs 6 Solves this by scheduling the rethrwn 
  
 

* simplified imports

  +  we will import everything that's a type or scheduler or a helper from 'rxjs', and all of the operators get imported from 'rxjs/operators' 
    - rxjs
     + Types: Observable, Subject, BehaviorSubject, etc.
     + Creation methods: fromEvent, timer, interval, delay, concat, etc.
     + Schedulers: asapScheduler, asyncScheduler, etc.
     + Helpers: `pipe`, noop, identity, etc
    
    - rxjs/operators
      + All operators: map, mergeMap, takeUtil, scan, and so on.

  ```ts
  import { interval, of } from 'rxjs';
  import { filter, mergeMap, scan } from 'rxjs/operators';

  interval(1000).pipe(
    filter(x => x % 2 === 0).
    mergeMap( x => of(x+1, x+2, x+3) ),
    scan(s, x) => s+x, 0),
  ).subscribe(x => console.log(x));

  ```

  + An exhaustive list of v6 import sites
    - rxjs
    - rxjs/operators
    - rxjs/testing
    - rxjs/websocket
    - rxjs/ajax 

* Deprecations (and removals)

  + the reason one : To many way to do the same thing 

  ```ts
  // these are all ways to do basically what observable `of` does 
  import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
  import { ScalarObservable } from 'rxjs/observable/ScalarObservable';
  import { fromArray } from 'rxjs/observable/fromArray';
  import { of } from 'rxjs/observable/of';
  import { Observable } from 'rxjs/observable/Observable';
  import 'rxjs/add/observable/of';

  Observable.of('foo');
  of('fo');
  fromArray(['foo']);
  new ScalarObservable('foo');
  ScalarObservable.create('foo');
  new ArrayObservable(['foo']);
  ArrayObservable.create(['foo']);
  
  ```

  + V6 there is one way to use something

  ```ts
  import { of } from 'rxjs';

  of('foo');
  
  ```

  + deprecate operators
    - concat
    - merge
    - zip
    - combineLatest

* a new operator

  + throwIfEmpty
    -  if the observable completes without emitting any values, will throw a error down the chain of observation.
    - id the observable emits even one value, the operator has no effect and is a pass-through

  + example

  > take all the button clicks until someone resizes the view and if no one clicks the button before the viewResize that said the error

  ```ts
  const mustClick$ = buttonClick$.pipe(
    takeUntil(this.viewResize$),
    throwIfEmpty(
      () = new Error(' user did not click before resize  ')
    )
  )
  
  ```

3. migration from rxjs 5 (important)

> https://www.youtube.com/watch?v=JCXZhe6KsxQ

* install rxjs-compat

```bash
# rxjs-compat provides a bridge to all of the old import and old types that existed in rxjs.5 
npm install rxjs-compat

```

* ng update rxjs : install the latest rxjs and rxjs-compat

* tslint to the rescue

    + install rxjs-tslint

    ```bash
    npm install rxjs-tslint

    # run tslint -fix (maybe more than once)

    > ./node_modules/.bin/tslint -c migrate.tslint.json  --project src/tsconfig.app.json --fix

    ```
    + create a migrate.tslint.json

    ```json
    {
      "ruleDirectory ": ["node_module/rxjs-tslint"],
      "rules": {
        "update-rxjs-imports": true,
        "migrate-to-pipeable-operators": true,
        "collapse-rxjs-imports": true
      }
    }
    
    ```

    + run tslint fix (maybe more than once)

    ```bash

    > ./node_modules/.bin/tslint -c migrate.tslint.json  --project src/tsconfig.app.json --fix

    ```

    + after `ng serve`  we can remove the rxjs-compat package

    ![](./img/rxjs.png)


## custom our own module

1. Typescript component selector should be named undefined

* If you are using angular-cli try to add your own prefix to the angular-cli.json:

```bash
  apps: [
    {  ..., "prefix": "swiftlog"}
  ]
```

2. also change your tslint config:

```bash
"component-selector": [true, "element", "swiftlog", "kebab-case"],

```



## mock data 

> on the component develop process , we have to request some  data Apis , instead of node serve , we can use the mock service ; this is the necessary to develop the base template; 

### json-server

1. install 

```ts
 var db = {};
  var files = fs.readdirSync(jsonfolder);
  files.forEach(function (file) {
      if (path.extname(jsonfolder + file) === '.json') {
          db[path.basename(jsonfolder + file, '.json')] = require(path.join(jsonfolder,file));
      }
  });
  // Returns an Express server
  var server = jsonServer.create();
  // Set default middlewares (logger, static, cors and no-cache)
  server.use(jsonServer.defaults());
  // Returns an Express router
  var router = jsonServer.router(db);
  server.use(router);
  server.listen(port);

```

### @delon/mock alibaba

1. install the @delon/mock

```bash
npm install mockjs@1.0.1-beta3 -D -s
npm install @types/mockjs@1.0.0 -D -s
npm install @delon/mock@1.3.3 -D -s
npm install date-fns -D -s
```


```ts
 // in the component
 this.http.get('/api/list', { count: this.q.ps }).subscribe((res: any) => {
    this.list = res.map(item => {
      item.activeUser = this.formatWan(item.activeUser);
      return item;
    });
    this.loading = false;
  });

```

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { Pizza } from '../models/pizza.model';

@Injectable()
export class PizzasService {
  constructor(private http: HttpClient) {}

  getPizzas(): Observable<Pizza[]> {
    return this.http
      .get<Pizza[]>(`/api/pizzas`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

}
```
