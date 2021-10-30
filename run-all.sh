#!/usr/bin/env bash
cd frontend && npm run start &
cd backend/users && npm run dev &
cd backend/editor && npm run dev &
cd backend/match && npm run dev &
cd backend/message && npm run dev &


