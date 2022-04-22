using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TodoApi.Migrations
{
    public partial class AddFKfortodorelatedwithuser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "Todos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Username1",
                table: "Todos",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Todos_Username1",
                table: "Todos",
                column: "Username1");

            migrationBuilder.AddForeignKey(
                name: "FK_Todos_Users_Username1",
                table: "Todos",
                column: "Username1",
                principalTable: "Users",
                principalColumn: "Username");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Todos_Users_Username1",
                table: "Todos");

            migrationBuilder.DropIndex(
                name: "IX_Todos_Username1",
                table: "Todos");

            migrationBuilder.DropColumn(
                name: "Username",
                table: "Todos");

            migrationBuilder.DropColumn(
                name: "Username1",
                table: "Todos");
        }
    }
}
