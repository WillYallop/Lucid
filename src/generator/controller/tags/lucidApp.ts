
import { Liquid, Context, Emitter } from 'liquidjs';

export const lucidAppTagRegister = (engine: Liquid, data: gen_templateCompilerProps["components"], addComponents: boolean) => {
    return engine.registerTag('lucidApp', {
        render: async function (context: Context, emitter: Emitter) {
            if(data != undefined && addComponents) {
                for (const [key, value] of data.entries()) {
                    emitter.write(value.markup);
                }
            }
            else emitter.write('<lucidPreviewAddComponents/>');
        }
    });
}