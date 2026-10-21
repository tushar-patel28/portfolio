/** Join class names, skipping falsy values. (No conflict resolution — don't pass competing utilities.) */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
