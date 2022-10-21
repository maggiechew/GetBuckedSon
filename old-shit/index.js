import terminalKitPackage from 'terminal-kit';
const { terminal: term } = terminalKitPackage;


term.red.bgCyan.bold( 'Hello ' ).green.bgMagenta.italic('world!\n') ;
