var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
import { Controller, Get, Post, Put, Delete, response } from "sdk/http";
import { Extensions } from "sdk/extensions";
import { GenderRepository } from "../../dao/Settings/GenderRepository";
import { ValidationError } from "../utils/ValidationError";
import { HttpUtils } from "../utils/HttpUtils";
const validationModules = await Extensions.loadExtensionModules("vitalis-Settings-Gender", ["validate"]);
let GenderService = (() => {
    let _classDecorators = [Controller];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getAll_decorators;
    let _create_decorators;
    let _count_decorators;
    let _countWithFilter_decorators;
    let _search_decorators;
    let _getById_decorators;
    let _update_decorators;
    let _deleteById_decorators;
    var GenderService = _classThis = class {
        constructor() {
            this.repository = (__runInitializers(this, _instanceExtraInitializers), new GenderRepository());
        }
        getAll(_, ctx) {
            try {
                const options = {
                    $limit: ctx.queryParameters["$limit"] ? parseInt(ctx.queryParameters["$limit"]) : undefined,
                    $offset: ctx.queryParameters["$offset"] ? parseInt(ctx.queryParameters["$offset"]) : undefined
                };
                return this.repository.findAll(options);
            }
            catch (error) {
                this.handleError(error);
            }
        }
        create(entity) {
            try {
                this.validateEntity(entity);
                entity.Id = this.repository.create(entity);
                response.setHeader("Content-Location", "/services/ts/vitalis/gen/vitalis/api/Settings/GenderService.ts/" + entity.Id);
                response.setStatus(response.CREATED);
                return entity;
            }
            catch (error) {
                this.handleError(error);
            }
        }
        count() {
            try {
                return this.repository.count();
            }
            catch (error) {
                this.handleError(error);
            }
        }
        countWithFilter(filter) {
            try {
                return this.repository.count(filter);
            }
            catch (error) {
                this.handleError(error);
            }
        }
        search(filter) {
            try {
                return this.repository.findAll(filter);
            }
            catch (error) {
                this.handleError(error);
            }
        }
        getById(_, ctx) {
            try {
                const id = parseInt(ctx.pathParameters.id);
                const entity = this.repository.findById(id);
                if (entity) {
                    return entity;
                }
                else {
                    HttpUtils.sendResponseNotFound("Gender not found");
                }
            }
            catch (error) {
                this.handleError(error);
            }
        }
        update(entity, ctx) {
            try {
                entity.Id = ctx.pathParameters.id;
                this.validateEntity(entity);
                this.repository.update(entity);
                return entity;
            }
            catch (error) {
                this.handleError(error);
            }
        }
        deleteById(_, ctx) {
            try {
                const id = ctx.pathParameters.id;
                const entity = this.repository.findById(id);
                if (entity) {
                    this.repository.deleteById(id);
                    HttpUtils.sendResponseNoContent();
                }
                else {
                    HttpUtils.sendResponseNotFound("Gender not found");
                }
            }
            catch (error) {
                this.handleError(error);
            }
        }
        handleError(error) {
            if (error.name === "ForbiddenError") {
                HttpUtils.sendForbiddenRequest(error.message);
            }
            else if (error.name === "ValidationError") {
                HttpUtils.sendResponseBadRequest(error.message);
            }
            else {
                HttpUtils.sendInternalServerError(error.message);
            }
        }
        validateEntity(entity) {
            var _a;
            if (((_a = entity.Name) === null || _a === void 0 ? void 0 : _a.length) > 255) {
                throw new ValidationError(`The 'Name' exceeds the maximum length of [255] characters`);
            }
            for (const next of validationModules) {
                next.validate(entity);
            }
        }
    };
    __setFunctionName(_classThis, "GenderService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getAll_decorators = [Get("/")];
        _create_decorators = [Post("/")];
        _count_decorators = [Get("/count")];
        _countWithFilter_decorators = [Post("/count")];
        _search_decorators = [Post("/search")];
        _getById_decorators = [Get("/:id")];
        _update_decorators = [Put("/:id")];
        _deleteById_decorators = [Delete("/:id")];
        __esDecorate(_classThis, null, _getAll_decorators, { kind: "method", name: "getAll", static: false, private: false, access: { has: obj => "getAll" in obj, get: obj => obj.getAll }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: obj => "create" in obj, get: obj => obj.create }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _count_decorators, { kind: "method", name: "count", static: false, private: false, access: { has: obj => "count" in obj, get: obj => obj.count }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _countWithFilter_decorators, { kind: "method", name: "countWithFilter", static: false, private: false, access: { has: obj => "countWithFilter" in obj, get: obj => obj.countWithFilter }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _search_decorators, { kind: "method", name: "search", static: false, private: false, access: { has: obj => "search" in obj, get: obj => obj.search }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getById_decorators, { kind: "method", name: "getById", static: false, private: false, access: { has: obj => "getById" in obj, get: obj => obj.getById }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: obj => "update" in obj, get: obj => obj.update }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteById_decorators, { kind: "method", name: "deleteById", static: false, private: false, access: { has: obj => "deleteById" in obj, get: obj => obj.deleteById }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        GenderService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return GenderService = _classThis;
})();
