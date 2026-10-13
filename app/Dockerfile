FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY Unbreakable.csproj packages.lock.json* ./
RUN dotnet restore
COPY . ./
RUN dotnet publish Unbreakable.csproj -c Release -o /out --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /out ./
EXPOSE 8080
ENTRYPOINT ["dotnet", "Unbreakable.dll"]
