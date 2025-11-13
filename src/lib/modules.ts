import { Fingerprint, Network, FileScan, Database, type LucideIcon } from "lucide-react";

export type Result = {
  id: string;
  vulnerability: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Vulnerable' | 'Secure' | 'Warning';
  description: string;
  remediation: string;
};

export type SecurityModule = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  mockResults: Result[];
};

export const securityModules: SecurityModule[] = [
  {
    id: "network-scan",
    name: "Network Scanner",
    description: "Discover devices on your network and identify open ports, services, and OS versions.",
    icon: Network,
    mockResults: [
      {
        id: "res-001",
        vulnerability: "Open RDP Port (3389)",
        severity: "Critical",
        status: "Vulnerable",
        description: "Port 3389 (Remote Desktop Protocol) is open to the internet on server 'PROD-DC-01'. This exposes the server to brute-force attacks and potential remote code execution.",
        remediation: "Configure a firewall rule to restrict access to this port to only authorized IP addresses. Use a VPN for remote access.",
      },
      {
        id: "res-002",
        vulnerability: "Outdated Apache Version",
        severity: "High",
        status: "Vulnerable",
        description: "Web server 'WEB-SRV-03' is running Apache 2.4.29, which has multiple known vulnerabilities (e.g., CVE-2021-40438).",
        remediation: "Update Apache to the latest stable version. Regularly patch all web server software.",
      },
      {
        id: "res-003",
        vulnerability: "Weak SSH Ciphers",
        severity: "Medium",
        status: "Warning",
        description: "SSH server on 'GIT-REPO-01' supports weak CBC-mode ciphers, which are vulnerable to plaintext recovery attacks.",
        remediation: "Disable weak ciphers in the SSH server configuration. Enforce strong cryptographic algorithms like AES-GCM.",
      },
       {
        id: "res-004",
        vulnerability: "Internal IP Disclosure",
        severity: "Low",
        status: "Warning",
        description: "An HTTP header on 'dev-web-01' is leaking an internal IP address (192.168.1.50).",
        remediation: "Configure the web server to strip or rewrite headers that contain internal network information.",
      },
    ],
  },
  {
    id: "webapp-audit",
    name: "Web App Audit",
    description: "Scan your web applications for common vulnerabilities like XSS, CSRF, and misconfigurations.",
    icon: FileScan,
    mockResults: [
      {
        id: "res-005",
        vulnerability: "Cross-Site Scripting (Reflected)",
        severity: "High",
        status: "Vulnerable",
        description: "The search parameter on '/search.php' is not properly sanitized, allowing reflected XSS attacks. Malicious scripts can be executed in a user's browser.",
        remediation: "Implement context-aware output encoding for all user-supplied input. Use a web application firewall (WAF) as an additional layer of defense.",
      },
      {
        id: "res-006",
        vulnerability: "Missing Security Headers",
        severity: "Medium",
        status: "Warning",
        description: "The application is missing key security headers like Content-Security-Policy (CSP) and Strict-Transport-Security (HSTS).",
        remediation: "Implement CSP to mitigate XSS and data injection attacks. Implement HSTS to enforce the use of HTTPS.",
      },
    ],
  },
  {
    id: "sql-injection",
    name: "SQL Injection Test",
    description: "Test for SQL injection vulnerabilities in your application's database interactions.",
    icon: Database,
    mockResults: [
      {
        id: "res-007",
        vulnerability: "Error-Based SQL Injection",
        severity: "Critical",
        status: "Vulnerable",
        description: "The 'id' parameter in the URL '/user/profile?id=1' is vulnerable to SQL injection. Database errors reveal schema information.",
        remediation: "Use parameterized queries (prepared statements) for all database access. Avoid dynamic SQL query construction with user input.",
      },
    ],
  },
  {
    id: "auth-bypass",
    name: "Auth Bypass Check",
    description: "Check for flaws in authentication and session management that could lead to unauthorized access.",
    icon: Fingerprint,
    mockResults: [
       {
        id: "res-008",
        vulnerability: "Insecure Direct Object Reference",
        severity: "High",
        status: "Vulnerable",
        description: "A user can access other users' invoices by incrementally changing the 'invoiceId' in the URL '/invoices/view?id=1234'.",
        remediation: "Implement access control checks on the server-side to ensure a user is authorized to access the requested resource.",
      },
      {
        id: "res-009",
        vulnerability: "Session Token Not Regenerated",
        severity: "Medium",
        status: "Warning",
        description: "The session token is not regenerated upon login, making the application susceptible to session fixation attacks.",
        remediation: "Regenerate the session token immediately after a user successfully authenticates.",
      }
    ]
  },
];
