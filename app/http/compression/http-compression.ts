export abstract class HttpCompression {
   public static algorithm = 'abstract-compression'

   public abstract compress(body: string): string
}