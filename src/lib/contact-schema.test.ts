import { describe, expect, it } from "vitest";
import { validateContact } from "./contact-schema";

const valid = {
  name: "Maria Souza",
  email: "maria@empresa.com",
  subject: "Oportunidade backend",
  message: "Olá Camilli, gostaria de conversar sobre uma vaga.",
};

describe("contact form validation", () => {
  it("accepts a complete message", () => {
    expect(validateContact(valid).data).toBeDefined();
  });

  it("rejects a malformed e-mail", () => {
    expect(validateContact({ ...valid, email: "maria@" }).errors.email).toBeDefined();
  });

  it("requires every field", () => {
    const { errors } = validateContact({ name: "", email: "", subject: "", message: "" });
    expect(Object.keys(errors).sort()).toEqual(["email", "message", "name", "subject"]);
  });
});
