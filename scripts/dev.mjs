import { spawn } from 'node:child_process';

const processes = [];

function start(command, args, label) {
  const child = spawn(command, args, {
    stdio: 'inherit',
    shell: false,
  });

  child.on('exit', (code, signal) => {
    if (code !== 0 && signal !== 'SIGTERM') {
      console.error(`[${label}] exited with code ${code ?? 'null'}${signal ? ` signal ${signal}` : ''}`);
      shutdown(1);
    }
  });

  processes.push(child);
  return child;
}

let shuttingDown = false;

function shutdown(code = 0) {
  if (shuttingDown) return;
  shuttingDown = true;

  for (const child of processes) {
    if (!child.killed) {
      child.kill('SIGTERM');
    }
  }

  setTimeout(() => process.exit(code), 200);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

start('node', ['--env-file=.env', 'server.js'], 'server');
start('vite', [], 'vite');
