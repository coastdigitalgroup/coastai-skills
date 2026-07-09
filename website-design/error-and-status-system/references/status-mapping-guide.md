# Status Code to UI Mapping

This guide maps common HTTP status codes to their appropriate design
treatments and user recovery paths.

| Code | Meaning | Design Treatment | Primary Recovery Path |
| :--- | :--- | :--- | :--- |
| **404** | Not Found | **Discovery View.** Light, helpful, and exploratory. | Search Bar + Popular Links |
| **403** | Forbidden | **Restricted View.** Secure, firm, but not blaming. | Login / Request Access |
| **500** | Server Error | **Reassurance View.** Apologetic and technical. | Retry / Status Page |
| **503** | Service Unavail. | **Maintenance View.** Informative and time-bound. | Estimated Return Time |
| **Offline** | No Connection | **State Banner.** Persistent and non-blocking. | Automatic Reconnect |

## Design Guidelines by Category

### Client Errors (4xx)
- **Goal:** Redirect and Help.
- **Tone:** Casual or Professional.
- **Focus:** The user's intent was correct, but the destination is gone.

### Server Errors (5xx)
- **Goal:** Apologize and Retain.
- **Tone:** Professional and Sincere.
- **Focus:** The system failed the user. Minimize the effort to try again.

### System States (Maintenance/Offline)
- **Goal:** Inform and Preserve.
- **Tone:** Technical and Direct.
- **Focus:** Transparency regarding when service will be restored.
