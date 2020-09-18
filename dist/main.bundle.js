/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/application.js":
/*!****************************!*\
  !*** ./src/application.js ***!
  \****************************/
/*! exports provided: AbstractApplication, ConsoleTaskApplication, TaskApplication */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AbstractApplication\", function() { return AbstractApplication; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ConsoleTaskApplication\", function() { return ConsoleTaskApplication; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TaskApplication\", function() { return TaskApplication; });\n/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo */ \"./src/todo.js\");\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ \"./src/render.js\");\n/* harmony import */ var _task_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./task-manager */ \"./src/task-manager.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./store */ \"./src/store.js\");\n\r\n\r\n\r\n\r\n\r\nclass AbstractApplication {\r\n    constructor(store, render) {\r\n        this._toDo = new _todo__WEBPACK_IMPORTED_MODULE_0__[\"ToDo\"](new _task_manager__WEBPACK_IMPORTED_MODULE_2__[\"TaskManager\"](store), render);\r\n    }\r\n    start() {\r\n        throw new Error('not emplemented');\r\n    }\r\n}\r\n\r\nclass ConsoleTaskApplication extends AbstractApplication {\r\n    constructor() {\r\n        super(new _store__WEBPACK_IMPORTED_MODULE_3__[\"Store\"](), new _render__WEBPACK_IMPORTED_MODULE_1__[\"Render\"]());\r\n    }\r\n\r\n    start() {\r\n        this._toDo.init();\r\n    }\r\n\r\n    addTask(title) {\r\n        this._toDo.addTask(title);\r\n    }\r\n\r\n    deleteTask(taskId) {\r\n        this._toDo.deleteTask(taskId);\r\n    }\r\n\r\n    toggleTask(taskId) {\r\n        this._toDo.toggleTask(taskId);\r\n    }\r\n}\r\n\r\nclass TaskApplication extends AbstractApplication {\r\n    constructor() {\r\n        const listRef = document.querySelector('#task-list');\r\n        const render = new _render__WEBPACK_IMPORTED_MODULE_1__[\"RenderApplication\"](listRef);\r\n        super(new _store__WEBPACK_IMPORTED_MODULE_3__[\"StoreLS\"](), render);\r\n        const buttonRef = document.querySelector('#add-button');\r\n        const inputRef = document.querySelector('#input');\r\n\r\n\r\n        buttonRef.addEventListener('click', () => {\r\n            this._toDo.addTask(inputRef.value);\r\n            inputRef.value = ''\r\n        })\r\n\r\n        render.deleteTaskFunction = this._toDo.deleteTask.bind(this._toDo);\r\n        render.toggleTaskFunction = this._toDo.toggleTask.bind(this._toDo);\r\n    }\r\n\r\n    start() {\r\n        this._toDo.init();\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/application.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./application */ \"./src/application.js\");\n!(function webpackMissingModule() { var e = new Error(\"Cannot find module './test'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n\r\n\r\n\r\nconst app = new _application__WEBPACK_IMPORTED_MODULE_0__[\"TaskApplication\"]();\r\napp.start();\r\n\r\nconst test = new !(function webpackMissingModule() { var e = new Error(\"Cannot find module './test'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/*! exports provided: AbstractRender, Render, RenderApplication */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AbstractRender\", function() { return AbstractRender; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Render\", function() { return Render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RenderApplication\", function() { return RenderApplication; });\nclass AbstractRender {\r\n    displayTask(task) {\r\n        throw new Error('not emplemented');\r\n    }\r\n\r\n    unDisplayTask(taskId) {\r\n        throw new Error('not emplemented');\r\n    }\r\n\r\n    displayError(error) {\r\n        throw new Error('not emplemented');\r\n    }\r\n\r\n    updateTask(task) {\r\n        throw new Error('not emplemented');\r\n    }\r\n}\r\n\r\nclass Render extends AbstractRender {\r\n    constructor() {\r\n        super();\r\n    }\r\n\r\n    displayTask(task) {\r\n        console.log(task);\r\n    }\r\n\r\n    unDisplayTask(taskId) {\r\n        throw new Error('not emplemented');\r\n    }\r\n\r\n    displayError(error) {\r\n        console.log(error);\r\n    }\r\n\r\n    updateTask(task) {\r\n        throw new Error('not emplemented');\r\n    }\r\n}\r\n\r\nclass RenderApplication extends AbstractRender {\r\n    constructor(listRef) {\r\n        super();\r\n        this._listRef = listRef;\r\n    }\r\n\r\n    set deleteTaskFunction(func) {\r\n        this._deleteTaskFunction = func;\r\n    }\r\n\r\n    set toggleTaskFunction(func) {\r\n        this._toggleTaskFunction = func;\r\n    }\r\n\r\n    displayTask(task) {\r\n        const wrapper = document.createElement('li');\r\n        wrapper.classList.add('todo-task');\r\n        wrapper.setAttribute('id', task.id);\r\n        if (task.isDone) {\r\n            wrapper.classList.add('todo-task_done');\r\n        }\r\n\r\n        const checkbox = document.createElement('input');\r\n        checkbox.setAttribute('type', 'checkbox');\r\n        checkbox.checked = task.isDone;\r\n\r\n        const title = document.createElement('span');\r\n        title.classList.add('todo-task__title');\r\n        title.textContent = task.title;\r\n\r\n        const button = document.createElement('button');\r\n        button.classList.add('todo-task__delete');\r\n\r\n        wrapper.appendChild(checkbox);\r\n        wrapper.appendChild(title);\r\n        wrapper.appendChild(button);\r\n        this._listRef.appendChild(wrapper);\r\n\r\n        button.addEventListener('click', (event) => {\r\n            const id = Number(event.currentTarget.parentNode.id);\r\n            this._deleteTaskFunction(id);\r\n        })\r\n\r\n        checkbox.addEventListener('change', (event) => {\r\n            const id = Number(event.currentTarget.parentNode.id);\r\n            this._toggleTaskFunction(id);\r\n        })\r\n    }\r\n\r\n    unDisplayTask(taskId) {\r\n        this._listRef.removeChild(document.getElementById(taskId));\r\n    }\r\n\r\n    displayError(error) {\r\n        console.log(error);\r\n    }\r\n\r\n    updateTask(task) {\r\n        const taskRef = document.getElementById(task.id);\r\n        task.isDone ?\r\n            taskRef.classList.add('todo-task_done') :\r\n            taskRef.classList.remove('todo-task_done');\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/render.js?");

/***/ }),

/***/ "./src/store.js":
/*!**********************!*\
  !*** ./src/store.js ***!
  \**********************/
/*! exports provided: AbstractStore, Store, StoreLS, StoreDB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AbstractStore\", function() { return AbstractStore; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Store\", function() { return Store; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"StoreLS\", function() { return StoreLS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"StoreDB\", function() { return StoreDB; });\n/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ \"./src/task.js\");\n\r\n\r\nclass TaskGettingError extends Error {\r\n    constructor(message) {\r\n        super(`The task can't be gotten: ${message}`);\r\n    }\r\n}\r\n\r\nclass TaskDeletingFromStoreError extends Error {\r\n    constructor(message) {\r\n        super(`The deletion process can't be made: ${message}`);\r\n    }\r\n}\r\n\r\nclass StoreUpdatingError extends Error {\r\n    constructor(message) {\r\n        super(`The updation process doesn't need be made: ${message}`);\r\n    }\r\n}\r\n\r\nclass AbstractStore {\r\n    get(taskId) {\r\n        throw new Error('Not implemented');\r\n    }\r\n\r\n    add(task) {\r\n        throw new Error('Not implemented');\r\n    }\r\n\r\n    delete(taskId) {\r\n        throw new Error('Not implemented');\r\n    }\r\n\r\n    update(task) {\r\n        throw new Error('Not implemented');\r\n\r\n    }\r\n\r\n    getAll() {\r\n        throw new Error('Not implemented');\r\n    }\r\n}\r\n\r\nclass Store extends AbstractStore {\r\n    constructor() {\r\n        super();\r\n        this._list = [];\r\n    }\r\n\r\n    get(taskId) {\r\n        debugger\r\n        const task = this._list.find(d => d.id === taskId);\r\n\r\n        if (!task) {\r\n            return Promise.reject(new TaskGettingError(\r\n                `Task which with id = ${taskId} haven't found, only tasks which consist in the list can be gotten`\r\n            ));\r\n        }\r\n\r\n        return Promise.resolve(task.clone());\r\n    }\r\n\r\n    add(task) {\r\n        debugger\r\n        this._list.push(task);\r\n        return Promise.resolve(task.clone());\r\n    }\r\n\r\n    delete(taskId) {\r\n        return new Promise(async(resolve, reject) => {\r\n            this._list = this._list.filter(d => d.id !== taskId);\r\n\r\n            try {\r\n                await this.get(taskId);\r\n\r\n            } catch (error) {\r\n                return reject(new TaskDeletingFromStoreError(\r\n                    error.message + `Task which needs to be deleted doesn't exist in the store, only tasks which are in the store can be deleted`\r\n                ));\r\n            }\r\n\r\n            return resolve(null);\r\n        })\r\n    }\r\n\r\n    async update(task) {\r\n        try {\r\n            await this.delete(task.id);\r\n        } catch (error) {\r\n            return Promise.reject(error);\r\n        }\r\n\r\n        return this.add(task);\r\n    }\r\n\r\n    getAll() {\r\n        return Promise.resolve(this._list.map(task => task.clone()));\r\n    }\r\n}\r\n\r\nclass StoreLS extends AbstractStore {\r\n    constructor() {\r\n        super();\r\n    }\r\n\r\n    async get(taskId) {\r\n        const taskProto = localStorage.getItem(StoreLS.lsKey + taskId);\r\n\r\n        if (!taskProto) {\r\n            return Promise.reject(new TaskGettingError(\r\n                `Task which with id = ${taskId} haven't found, only tasks which consist in the list can be gotten`\r\n            ));\r\n        }\r\n\r\n        return Promise.resolve(_task__WEBPACK_IMPORTED_MODULE_0__[\"Task\"].parse(taskProto));\r\n    }\r\n\r\n    add(task) {\r\n        localStorage.setItem(StoreLS.lsKey + task.id, _task__WEBPACK_IMPORTED_MODULE_0__[\"Task\"].deparse(task));\r\n        return Promise.resolve(task.clone());\r\n    }\r\n\r\n    async delete(taskId) {\r\n        localStorage.removeItem(StoreLS.lsKey + taskId);\r\n\r\n        try {\r\n            (await this.getAll()).find(el => el.id !== taskId);\r\n        } catch (error) {\r\n            return Promise.reject(new TaskDeletingFromStoreError(\r\n                error.message + `Task which needs to be deleted doesn't exist in the store, only tasks which are in the store can be deleted`\r\n            ));\r\n        }\r\n\r\n        return Promise.resolve(null);\r\n    }\r\n\r\n    async update(task) {\r\n        try {\r\n            await this.delete(task.id);\r\n        } catch (error) {\r\n            return Promise.reject(error);\r\n        }\r\n\r\n        return this.add(task);\r\n    }\r\n\r\n    getAll() {\r\n        return Promise.resolve(new Array(localStorage.length)\r\n            .fill()\r\n            .map((_, index) => index)\r\n            .map(keyIndex => localStorage.key(keyIndex))\r\n            .filter(el => el.indexOf(StoreLS.lsKey) === 0)\r\n            .map(key => localStorage.getItem(key))\r\n            .map(json => _task__WEBPACK_IMPORTED_MODULE_0__[\"Task\"].parse(json)));\r\n    }\r\n}\r\n\r\nStoreLS.lsKey = 'data';\r\n\r\nclass StoreDB extends AbstractStore {\r\n    constructor() {\r\n        super();\r\n        this._url = \"http://localhost:3000/tasks\";\r\n    }\r\n\r\n    get(taskId) {\r\n        return fetch(this._url + `/${taskId}`, {\r\n                method: \"GET\",\r\n                headers: { 'Content-Type': 'application/json' }\r\n            })\r\n            .then(response => response.json())\r\n            .then(obj => _task__WEBPACK_IMPORTED_MODULE_0__[\"Task\"].parseObject(obj));\r\n    }\r\n\r\n    add(task) {\r\n        return fetch(this._url, {\r\n                method: \"POST\",\r\n                headers: { 'Content-Type': 'application/json' },\r\n                body: _task__WEBPACK_IMPORTED_MODULE_0__[\"Task\"].deparse(task)\r\n            })\r\n            .then(response => response.json())\r\n            .then(json => _task__WEBPACK_IMPORTED_MODULE_0__[\"Task\"].parse(json))\r\n    }\r\n\r\n    delete(taskId) {\r\n        return fetch(this._url + `/${taskId}`, {\r\n                method: \"DELETE\",\r\n                headers: { 'Content-Type': 'application/json' }\r\n            })\r\n            .then(response => response.json())\r\n    }\r\n\r\n    async update(task) {\r\n        try {\r\n            await this.delete(task.id);\r\n        } catch (error) {\r\n            return Promise.reject(error);\r\n        }\r\n\r\n        return this.add(task);\r\n    }\r\n\r\n    getAll() {\r\n        return fetch(this._url, {\r\n                method: \"GET\",\r\n                headers: { 'Content-Type': 'application/json' }\r\n            })\r\n            .then(response => response.json())\r\n            .then(jsonArray => jsonArray.map(obj => _task__WEBPACK_IMPORTED_MODULE_0__[\"Task\"].parseObject(obj)))\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/store.js?");

/***/ }),

/***/ "./src/task-manager.js":
/*!*****************************!*\
  !*** ./src/task-manager.js ***!
  \*****************************/
/*! exports provided: TaskManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TaskManager\", function() { return TaskManager; });\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ \"./src/store.js\");\n/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task */ \"./src/task.js\");\n\r\n\r\n\r\n\r\nclass ClassInstanceError extends Error {\r\n    constructor(message) {\r\n        super(`This object doesn't relate to this class: ${message}`);\r\n    }\r\n}\r\n\r\nclass TaskDeletionError extends Error {\r\n    constructor(message) {\r\n        super(`The deletion process can't be made: ${message}`);\r\n    }\r\n}\r\n\r\nclass TaskManager {\r\n\r\n    constructor(store) {\r\n\r\n        if (!(store instanceof _store__WEBPACK_IMPORTED_MODULE_0__[\"AbstractStore\"])) {\r\n            throw new ClassInstanceError(\r\n                `Store = ${store} isn't instance of ${_store__WEBPACK_IMPORTED_MODULE_0__[\"AbstractStore\"]}, but for further actions should`\r\n            );\r\n        }\r\n\r\n        this._store = store;\r\n    }\r\n\r\n    create(title) {\r\n\r\n        let randomId = function(pow) {\r\n            return Math.floor(Math.random() * pow);\r\n        }\r\n\r\n        const id = randomId(100);\r\n\r\n        return this._store.add(new _task__WEBPACK_IMPORTED_MODULE_1__[\"Task\"](id, title));\r\n\r\n    }\r\n\r\n    delete(taskId) {\r\n        if (!taskId) {\r\n            throw new TaskDeletionError(\r\n                `Task which needs to be deleted hasn't been found, only tasks which are in the list can be deleted`\r\n            );\r\n        }\r\n        return this._store.delete(taskId);\r\n\r\n    }\r\n\r\n    async toggle(taskId) {\r\n\r\n        const task = await this._store.get(taskId);\r\n        task.toggle();\r\n\r\n        return this._store.update(task);\r\n\r\n    }\r\n\r\n    getAll() {\r\n\r\n        return this._store.getAll();\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/task-manager.js?");

/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/*! exports provided: Task */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Task\", function() { return Task; });\nclass Task {\r\n    get title() {\r\n        return this._title;\r\n    }\r\n\r\n    get id() {\r\n        return this._id;\r\n    }\r\n\r\n    get isDone() {\r\n        return this._isDone;\r\n    }\r\n\r\n    constructor(id, title, isDone = false) {\r\n        this._id = id;\r\n        this._isDone = isDone;\r\n        this._title = title;\r\n    }\r\n\r\n    toggle() {\r\n        this._isDone = !this._isDone;\r\n    }\r\n\r\n    clone() {\r\n        return new Task(this._id, this._title, this._isDone);\r\n    }\r\n\r\n    static deparse(task) {\r\n        return JSON.stringify({\r\n            id: task._id,\r\n            title: task._title,\r\n            isDone: task._isDone\r\n        })\r\n    }\r\n\r\n    static parse(jsonLine) {\r\n        const json = JSON.parse(jsonLine);\r\n        return new Task(json.id, json.title, json.isDone);\r\n    }\r\n\r\n    static parseObject(obj) {\r\n        return new Task(obj.id, obj.title, obj.isDone);\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/task.js?");

/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/*! exports provided: ToDo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ToDo\", function() { return ToDo; });\nclass ToDo {\r\n    constructor(taskManager, render) {\r\n        this._taskManager = taskManager;\r\n        this._render = render;\r\n    }\r\n\r\n    init() {\r\n        this._displayAll();\r\n    }\r\n\r\n    async addTask(title) {\r\n        try {\r\n            this._render.displayTask(await this._taskManager.create(title));\r\n        } catch (error) {\r\n            this._render.displayError(error);\r\n        }\r\n    }\r\n\r\n    async deleteTask(taskId) {\r\n        try {\r\n            await this._taskManager.delete(taskId);\r\n            this._render.unDisplayTask(taskId);\r\n\r\n        } catch (error) {\r\n            this._render.displayError(error);\r\n        }\r\n    }\r\n\r\n    async toggleTask(taskId) {\r\n        try {\r\n            this._render.updateTask(await this._taskManager.toggle(taskId));\r\n        } catch (error) {\r\n            this._render.displayError(error);\r\n        }\r\n    }\r\n\r\n    _displayAll() {\r\n        this._taskManager.getAll()\r\n            .then(tasks => tasks.forEach(task => this._render.displayTask(task)))\r\n            .catch(error => this._render.displayError(error))\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/todo.js?");

/***/ })

/******/ });