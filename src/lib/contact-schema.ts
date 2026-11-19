import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Informe seu nome completo.")
    .max(100, "O nome deve ter no máximo 100 caracteres."),
  email: z
    .string()
    .trim()
    .min(1, "Informe seu e-mail.")
    .email("Informe um e-mail válido, como nome@exemplo.com.")
    .max(255, "O e-mail deve ter no máximo 255 caracteres."),
  subject: z
    .string()
    .trim()
    .min(3, "Informe o assunto da mensagem.")
    .max(150, "O assunto deve ter no máximo 150 caracteres."),
  message: z
    .string()
    .trim()
    .min(10, "A mensagem deve ter pelo menos 10 caracteres.")
    .max(2000, "A mensagem deve ter no máximo 2000 caracteres."),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export function validateContact(input: ContactInput): { data?: ContactInput; errors: ContactErrors } {
  const result = contactSchema.safeParse(input);
  if (result.success) return { data: result.data, errors: {} };
  const errors: ContactErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof ContactInput;
    if (!errors[key]) errors[key] = issue.message;
  }
  return { errors };
}
