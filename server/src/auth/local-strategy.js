import passport from "passport";
import { Strategy } from "passport-local";
import { User } from '../database/schemas/user.mjs';
import { comparePasswords } from "./hash.mjs";