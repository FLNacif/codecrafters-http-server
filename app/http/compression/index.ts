import { DeflateCompression } from "./deflate";
import { GzipCompression } from "./gzip";

export const supportedCompressions = [DeflateCompression.algorithm, GzipCompression.algorithm]