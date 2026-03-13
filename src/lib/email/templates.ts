interface DeadlineAlert {
  deadlineName: string;
  deadlineDate: string;
  daysUntil: number;
}

export function buildDeadlineAlertEmail(deadlines: DeadlineAlert[]): string {
  const rows = deadlines
    .map(
      (d) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #e7e5e4">
          <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:15px;font-weight:600;color:#1c1917;margin:0">${d.deadlineName}</p>
          <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:13px;color:#78716c;margin:4px 0 0">${d.deadlineDate} (${d.daysUntil} ${d.daysUntil === 1 ? "zi" : "zile"} ramase)</p>
        </td>
      </tr>`
    )
    .join("");

  return `<table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#fafaf9;padding:40px 0">
  <tr>
    <td align="center">
      <table width="480" border="0" cellspacing="0" cellpadding="0" style="background-color:#ffffff;border-radius:12px;border:1px solid #e7e5e4;overflow:hidden">
        <tr>
          <td style="background-color:#1c1917;padding:24px 32px;text-align:center">
            <img src="https://prevo.ro/logo-email.svg" alt="prevo" width="120" height="32" style="display:block;margin:0 auto" />
          </td>
        </tr>
        <tr>
          <td style="padding:32px 32px 24px">
            <h1 style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:22px;font-weight:700;color:#1c1917;margin:0 0 8px">Termene fiscale aproape</h1>
            <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:15px;line-height:24px;color:#78716c;margin:0 0 20px">
              Ai ${deadlines.length} ${deadlines.length === 1 ? "termen fiscal" : "termene fiscale"} care se apropie. Verifica detaliile mai jos.
            </p>
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              ${rows}
            </table>
            <table border="0" cellspacing="0" cellpadding="0" style="margin:24px auto 0">
              <tr>
                <td align="center" style="background-color:#1c1917;border-radius:8px">
                  <a href="https://prevo.ro/calendar" target="_blank" style="display:inline-block;padding:12px 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none">Vezi calendarul fiscal</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 32px">
            <hr style="border:none;border-top:1px solid #e7e5e4;margin:24px 0" />
            <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:12px;color:#a8a29e;margin:0;line-height:20px">
              Poti modifica preferintele de alerte din setarile contului tau Prevo.
            </p>
            <p style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:12px;color:#a8a29e;margin:8px 0 0;line-height:20px">
              prevo.ro — Educatie fiscala pentru PFA si SRL
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}
