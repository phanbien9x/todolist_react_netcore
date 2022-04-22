using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TodoApi.Migrations
{
    public partial class AddFKfortod : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Todos_Users_Username1",
                table: "Todos");

            migrationBuilder.DropColumn(
                name: "Username",
                table: "Todos");

            migrationBuilder.RenameColumn(
                name: "Username1",
                table: "Todos",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Todos_Username1",
                table: "Todos",
                newName: "IX_Todos_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Todos_Users_UserId",
                table: "Todos",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Username");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Todos_Users_UserId",
                table: "Todos");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Todos",
                newName: "Username1");

            migrationBuilder.RenameIndex(
                name: "IX_Todos_UserId",
                table: "Todos",
                newName: "IX_Todos_Username1");

            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "Todos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Todos_Users_Username1",
                table: "Todos",
                column: "Username1",
                principalTable: "Users",
                principalColumn: "Username");
        }
    }
}
