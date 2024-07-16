export default function executionTime(seconds: boolean = false) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const method = descriptor.value;
        descriptor.value = function (...args: Array<any>) {
            console.log(`Método ${propertyKey}`);
            console.log(`Parâmetros: ${JSON.stringify(args)}`);
            const SaveMethod = method.apply(this, args);
            console.log(`Method ${JSON.stringify(SaveMethod)}`);

            return SaveMethod;
        };
        return descriptor;
    };
}
