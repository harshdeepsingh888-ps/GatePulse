import { LoginForm } from "@/components/auth/login-form";

export function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/20 p-6">
      <LoginForm />
    </div>
  );
}