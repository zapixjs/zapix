# Security Policy

## Supported Versions

| Version         | Supported          |
| --------------- | ------------------ |
| 1.0.0-beta.x    | :white_check_mark: |
| < 1.0.0-beta.1  | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in Zapix, please report it responsibly. **Do not open a public GitHub issue.**

Instead, please email **raihansharif.dev@gmail.com** with:

- A description of the vulnerability
- Steps to reproduce the issue
- The potential impact
- Any suggested fix (optional)

You should receive an acknowledgement within **48 hours**. We will work with you to understand the issue and coordinate a fix and disclosure timeline.

## Disclosure Policy

- We will confirm receipt of your report within 48 hours.
- We will provide an estimated timeline for a fix within 7 days.
- We will notify you when the vulnerability is fixed.
- We will credit you in the release notes (unless you prefer to remain anonymous).

## Security Best Practices for Users

When using Zapix in your applications:

- Keep Zapix and its dependencies up to date.
- Validate and sanitize all user input in your route handlers.
- Use environment variables for secrets — never hardcode credentials.
- Apply the principle of least privilege to your Lambda IAM roles.
- Enable AWS CloudTrail and Lambda logging for audit trails.

## Scope

This policy applies to all packages in the Zapix repository and their source code.

Third-party plugins, adapters, or applications built with Zapix are outside the scope of this policy.