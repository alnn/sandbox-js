var synaptic = require('synaptic'),
    Neuron      = synaptic.Neuron,
    Layer       = synaptic.Layer,
    Network     = synaptic.Network,
    Trainer     = synaptic.Trainer,
    Architect   = synaptic.Architect,
    net;

net = new Architect.Perceptron(10, 7, 1);

var trainingSet = [
    {
        input: [0,0,1,0.12,0,0,0,0,1,1],
        output: [0.77]
    },
    {
        input:  [0,1,0,0.045,0,0,1,1,0,0],
        output: [0.01]
    },
    {
        input:  [1,0,0,0.42,1,1,0,0,0,0],
        output: [0.78]
    }
];

var trainingOptions = {
    rate: .1,
    iterations: 20000,
    error: .005,
};

var res = net.trainer.train(trainingSet, trainingOptions);

console.log(res);

console.log('\n');

console.log(net.activate([0,1,0,0.045,0,0,1,1,0,0]));
console.log(net.activate([0,1,0,0.045,0,0,1,1,0,0]));

