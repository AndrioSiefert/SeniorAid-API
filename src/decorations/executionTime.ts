export default function executionTime(seconds: boolean = false) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const method = descriptor.value;
        descriptor.value = function (...args: Array<any>) {
            let divisor = 1;
            let unidade = "milisegundos";
            if (seconds) {
                divisor = 1000;
                unidade = "segundos";
            }
            const time1 = performance.now();
            const SaveMethod = method.apply(this, args);
            const time2 = performance.now();
            console.log(
                `${propertyKey}, Tempo de Execução: ${
                    (time2 - time1) / divisor
                } 
                ${unidade}`
            );
            SaveMethod;
        };
        return descriptor;
    };
}

// mostra o tempo de execução
