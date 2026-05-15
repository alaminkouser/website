#!/usr/bin/env sh

typst compile resume/main.typ --ignore-system-fonts --font-path="./resume/backend/fonts/" --input AAK_EMAIL="$AAK_EMAIL" --input AAK_PHONE="$AAK_PHONE"
mv resume/main.pdf app/home/resume.pdf