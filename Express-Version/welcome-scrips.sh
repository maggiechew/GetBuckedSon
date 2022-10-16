#!/bin/bash
echo "Press (q) to Start the Game"
while true; do
  read -rsn1 input
  if [ "$input" = "w" ]; then
    curl -s http://localhost:3500/forward
  elif [ "$input" = "s" ]; then
    curl -s http://localhost:3500/backward
  elif [ "$input" = "a" ]; then
    curl -s http://localhost:3500/left
  elif [ "$input" = "d" ]; then
    curl -s http://localhost:3500/right
  elif [ "$input" = "h" ]; then
    curl -s http://localhost:3500/x
  elif [ "$input" = "g" ]; then
    curl -s http://localhost:3500/y
  elif [ "$input" = "k" ]; then
    curl -s http://localhost:3500/b
  elif [ "$input" = "l" ]; then
    curl -s http://localhost:3500/a
  elif [ "$input" = "p" ]; then
    curl -s http://localhost:3500/rb
  elif [ "$input" = "o" ]; then
    curl -s http://localhost:3500/lb
  elif [ "$input" = "r" ]; then
    curl -s http://localhost:3500/start
  elif [ "$input" = "x" ]; then
    curl -s http://localhost:3500/select
  elif [ "$input" = "z" ]; then
    curl -s http://localhost:3500/rj
  elif [ "$input" = "q" ]; then
    curl -s http://localhost:3500/

  fi
  printf "\n"
done
