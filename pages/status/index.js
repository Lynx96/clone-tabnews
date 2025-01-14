import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <div
      style={{
        display: "flex",
        height: "20rem",
        width: "auto",
        borderRadius: "1rem",
        backgroundColor: "#8d8d8d",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ display: "flex", color: "beige", textDecoration: "solid" }}>
        Statusss
      </h1>
      <UpdatedAt />
      <DatabaseInfo />
    </div>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  let UpdatedAtText = "Carregando...";

  if (!isLoading && data) {
    UpdatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");

    return <>Ultima atualização: {UpdatedAtText}</>;
  }
}

function DatabaseInfo() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseStatusInfo = "Carregando...";

  if (!isLoading && data) {
    databaseStatusInfo = (
      <>
        <p>Dados do banco</p>
        <p>PostgreSQL Version: {data.dependencies.database.psql_version}</p>
        <p>Max Connections: {data.dependencies.database.max_connections}</p>
        <p>Used Connections: {data.dependencies.database.used_connections}</p>
      </>
    );
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "20rem",
          marginTop: "2rem",
          width: "auto",
        }}
      >
        {databaseStatusInfo}
      </div>
    </>
  );
}
