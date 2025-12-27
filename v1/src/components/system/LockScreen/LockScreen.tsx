import { useState } from "react";
import { GravityStarsBackground } from "@/components/common/animate-ui/components/backgrounds/gravity-stars";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  Input,
  Button,
} from "@/components/common/ui";

export const LockScreen = () => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log("Password submitted:", password);
  };

  return (
    <div className="fixed left-0 right-0 top-0 bottom-0">
      <GravityStarsBackground starsCount={200} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-3/4 w-72">
        <h1 className="text-3xl select-none">Welcome to B.O.S.S.</h1>
        <h3 className="text-lg mt-6 mb-3 select-none">Hello Guest</h3>
        <form onSubmit={handleSubmit}>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <FieldDescription className="text-left">
                  Password for guest is &quot;guest1234&quot;
                </FieldDescription>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
              <Button type="submit">Sign in</Button>
            </FieldGroup>
          </FieldSet>
        </form>
      </div>
    </div>
  );
};
