"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
{
    const fs = require('fs');
    const path = require('path');
    const { v4: uuidv4 } = require('uuid');
    const themeDirectory = path.resolve(__dirname, '../../theme');
    const validateComponentName = require('./validation/components/name');
    const validateComponentDescription = require('./validation/components/description');
    const verifyFileExists = require('./verify-file');
    const errorCodeKey = 'component_';
    function getComponentNames() {
        return __awaiter(this, void 0, void 0, function* () {
            let files = yield fs.readdirSync(`${themeDirectory}/components`);
            var fileNames = [];
            files.forEach((file) => {
                fileNames.push(file);
            });
            return fileNames;
        });
    }
    function getUnregisteredComponents() {
        return __awaiter(this, void 0, void 0, function* () {
            let components = yield getComponentNames();
            if (components.length) {
                var response = {
                    has_components: true,
                    unregistered: []
                };
                let componentsConfigRaw = fs.readFileSync(`${themeDirectory}/config/components.json`);
                let componentsConfig = JSON.parse(componentsConfigRaw);
                components.forEach((filename) => {
                    let findComponent = componentsConfig.find(x => x.file_name === filename);
                    if (!findComponent)
                        response.unregistered.push(filename);
                });
                return response;
            }
            else {
                return {
                    has_components: false,
                    unregistered: []
                };
            }
        });
    }
    function getRegisteredComponents(mode) {
        return __awaiter(this, void 0, void 0, function* () {
            let components = yield getComponentNames();
            if (components.length) {
                var componentsResponse = {
                    has_components: true,
                    unregistered: [],
                    registered: []
                };
                let componentsConfigRaw = fs.readFileSync(`${themeDirectory}/config/components.json`);
                let componentsConfig = JSON.parse(componentsConfigRaw);
                components.forEach((filename) => {
                    let findComponent = componentsConfig.find(x => x.file_name === filename);
                    if (findComponent) {
                        if (mode === 'names')
                            componentsResponse.registered.push(filename);
                        else if (mode === 'data')
                            componentsResponse.registered.push(findComponent);
                        else { }
                    }
                    else
                        componentsResponse.unregistered.push(filename);
                });
                return componentsResponse;
            }
            else
                return {
                    has_components: false,
                    unregistered: [],
                    registered: []
                };
        });
    }
    function registerNewComponent(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const file_name = data.file_name;
            let componentsConfigRaw = fs.readFileSync(`${themeDirectory}/config/components.json`);
            var componentsConfig = JSON.parse(componentsConfigRaw);
            var response = {
                valid: true,
                errors: []
            };
            var verifyNameRes = yield validateComponentName(data.name);
            if (!verifyNameRes.valid)
                response.errors = response.errors.concat(verifyNameRes.errors), response.valid = false;
            var verifyDescRes = yield validateComponentDescription(data.description);
            if (!verifyDescRes.valid)
                response.errors = response.errors.concat(verifyDescRes.errors), response.valid = false;
            if (file_name) {
                let verifyFileRes = yield verifyFileExists(`${themeDirectory}/components/${file_name}`);
                if (!verifyFileRes)
                    response.errors.push({ code: `${errorCodeKey}not_found`, msg: `Cannot find component with file_name of ${file_name} in the theme directory!` }), response.valid = false;
                let findComponentRes = yield componentsConfig.find(x => x.file_name === file_name);
                if (findComponentRes)
                    response.errors.push({ code: `${errorCodeKey}exists_already`, msg: `It seems the component with file_name of ${file_name} has already been registered!` }), response.valid = false;
            }
            else
                response.errors.push({ code: `${errorCodeKey}file_name_missing`, msg: `You must enter a valid file_name!` }), response.valid = false;
            if (response.valid) {
                let componentObj = {
                    id: uuidv4(),
                    file_name: file_name,
                    name: verifyNameRes.uriComponentEncoded,
                    description: verifyDescRes.uriComponentEncoded,
                    preview_url: '',
                    date_added: new Date().toString(),
                    date_modified: new Date().toString(),
                    fields: []
                };
                componentsConfig.push(componentObj);
                response.component = componentObj;
                let data = JSON.stringify(componentsConfig);
                fs.writeFileSync(`${themeDirectory}/config/components.json`, data);
                return response;
            }
            else {
                return response;
            }
        });
    }
    module.exports = {
        getRegisteredComponents,
        getUnregisteredComponents,
        getComponentNames,
        registerNewComponent
    };
}
