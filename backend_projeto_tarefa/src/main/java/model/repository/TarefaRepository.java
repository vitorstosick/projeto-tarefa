package model.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import model.entity.Tarefa;
import model.seletor.TarefaSeletor;

public class TarefaRepository implements BaseRepository<Tarefa> {

	@Override
	public Tarefa inserir(Tarefa novaTarefa) {
		String query = "INSERT INTO tarefa.tarefas (id_usuario, nome_tarefa, tipo_tarefa) VALUES (?, ?, ?)";
		Connection conn = Banco.getConnection();
		PreparedStatement pstmt = Banco.getPreparedStatementWithPk(conn, query);

		try {
			pstmt.setInt(1, novaTarefa.getUsuario().getIdUsuario());
			pstmt.setString(2, novaTarefa.getNomeTarefa());
			pstmt.setString(3, novaTarefa.getTipoTarefa());
			pstmt.execute();
			ResultSet resultado = pstmt.getGeneratedKeys();
			if (resultado.next()) {
				novaTarefa.setIdTarefa(resultado.getInt(1));
			}

		} catch (SQLException e) {
			System.out.println("Erro ao salvar tarefa");
			System.out.println("Erro: " + e.getMessage());
		} finally {
			Banco.closePreparedStatement(pstmt);
			Banco.closeConnection(conn);
		}

		return novaTarefa;
	}

	@Override
	public boolean excluir(int idTarefa) {
		String query = "DELETE FROM tarefa.tarefas where id_tarefa =" + idTarefa;
		Connection conn = Banco.getConnection();
		Statement stmt = Banco.getStatement(conn);
		boolean retorno = false;

		try {
			if (stmt.executeUpdate(query) == 1) {
				retorno = true;
			}

		} catch (SQLException e) {
			System.out.println("ERRO AO EXCLUIR UMA TAREFA.");
			System.out.println("ERRO: " + e.getMessage());
		} finally {
			Banco.closeStatement(stmt);
			Banco.closeConnection(conn);

		}

		return retorno;
	}

	@Override
	public boolean alterar(Tarefa tarefaSelecionada) {
		String query = "UPDATE tarefa.tarefas " + " SET nome_tarefa=?, tipo_tarefa=?, realizada=?, isTemplate=? where id_tarefa=? ";
		Connection conn = Banco.getConnection();
		PreparedStatement pstmt = Banco.getPreparedStatementWithPk(conn, query);
		boolean alterou = false;

		try {
			pstmt.setString(1, tarefaSelecionada.getNomeTarefa());
			pstmt.setString(2, tarefaSelecionada.getTipoTarefa());
			pstmt.setBoolean(3, tarefaSelecionada.getRealizado());
			pstmt.setBoolean(4, tarefaSelecionada.getIsTemplate());
			pstmt.setInt(5, tarefaSelecionada.getIdTarefa());
			alterou = pstmt.executeUpdate() > 0;

		} catch (Exception e) {
			System.out.println("Erro ao atualizar tarefa");
			System.out.println("Erro: " + e.getMessage());
		} finally {
			Banco.closeStatement(pstmt);
			Banco.closeConnection(conn);

		}

		return alterou;
	}

	@Override
	public Tarefa consultarPorId(int id) {
		String query = "SELECT * FROM tarefa.tarefas where id_tarefa = " + id;
		Connection conn = Banco.getConnection();
		Statement stmt = Banco.getStatement(conn);
		Tarefa tarefa = null;
		ResultSet resultado = null;

		try {
			resultado = stmt.executeQuery(query);
			if (resultado.next()) {
				tarefa = new Tarefa();
				tarefa.setIdTarefa(resultado.getInt("id_tarefa"));
				
				UsuarioRepository usuarioReposotory = new UsuarioRepository();
				tarefa.setUsuario(usuarioReposotory.consultarPorId(resultado.getInt("id_usuario")));

				tarefa.setNomeTarefa(resultado.getString("nome_tarefa"));
				tarefa.setTipoTarefa(resultado.getString("tipo_tarefa"));
				tarefa.setRealizado(resultado.getBoolean("realizada"));
				tarefa.setIsTemplate(resultado.getBoolean("isTemplate"));
				ItemTarefaRepository itemTarefa = new ItemTarefaRepository();
				tarefa.setItensTarefa(
						itemTarefa.consultarTodosOsItensAssociadoUmaTarefa(resultado.getInt("id_tarefa")));

			}

		} catch (SQLException e) {
			System.out.println("Erro ao consultar tarefa por ID.");
			System.out.println("ERRO: " + e.getMessage());
		} finally {
			Banco.closeResultSet(resultado);
			Banco.closeStatement(stmt);
			Banco.closeConnection(conn);
		}
		return tarefa;
	}

	@Override
	public ArrayList<Tarefa> consultarTodos() {
		ArrayList<Tarefa> listaTarefas = new ArrayList<Tarefa>();

		String query = "SELECT * FROM tarefa.tarefas";
		Connection conn = Banco.getConnection();
		Statement stmt = Banco.getStatement(conn);
		Tarefa tarefa = null;
		ResultSet resultado = null;

		try {
			resultado = stmt.executeQuery(query);
			while (resultado.next()) {
				tarefa = new Tarefa();
				tarefa.setIdTarefa(resultado.getInt("id_tarefa"));
				tarefa.setNomeTarefa(resultado.getString("nome_tarefa"));
				tarefa.setTipoTarefa(resultado.getString("tipo_tarefa"));
				tarefa.setRealizado(resultado.getBoolean("realizada"));
				tarefa.setIsTemplate(resultado.getBoolean("isTemplate"));
				ItemTarefaRepository repository = new ItemTarefaRepository();
				tarefa.setItensTarefa(
						repository.consultarTodosOsItensAssociadoUmaTarefa(resultado.getInt("id_tarefa")));
				listaTarefas.add(tarefa);
			}

		} catch (SQLException e) {
			System.out.println("Erro ao consultar todos as tarefas no banco.");
			System.out.println("ERRO: " + e.getMessage());
		}

		return listaTarefas;
	}

	public ArrayList<Tarefa> consultarPorFiltro(TarefaSeletor seletor) {
		ArrayList<Tarefa> listaTarefas = new ArrayList<Tarefa>();

		String query = "select t.* from tarefa.tarefas t ";
		Connection conn = Banco.getConnection();
		Statement stmt = Banco.getStatement(conn);
		Tarefa tarefa = null;
		ResultSet resultado = null;

		query = incluirFiltros(seletor, query);

		if (seletor.temPaginacao()) {
			query += " limit " + seletor.getLimite();
			query += " offset " + seletor.getOffset();
		}

		try {
			resultado = stmt.executeQuery(query);
			while (resultado.next()) {
				tarefa = new Tarefa();
				tarefa.setIdTarefa(resultado.getInt("id_tarefa"));
				tarefa.setNomeTarefa(resultado.getString("nome_tarefa"));
				tarefa.setTipoTarefa(resultado.getString("tipo_tarefa"));
				tarefa.setRealizado(resultado.getBoolean("realizada"));
				ItemTarefaRepository itemTarefa = new ItemTarefaRepository();
				tarefa.setItensTarefa(
						itemTarefa.consultarTodosOsItensAssociadoUmaTarefa(resultado.getInt("id_tarefa")));
				listaTarefas.add(tarefa);
			}

		} catch (SQLException e) {
			System.out.println("Erro ao consultar tarefas com seletor no banco.");
			System.out.println("ERRO: " + e.getMessage());
		}

		return listaTarefas;
	}

	private String incluirFiltros(TarefaSeletor seletor, String query) {
		boolean primeiro = true;

		if (seletor.getNomeTarefa() != null) {
			if (primeiro) {
				query += " where ";
			} else {
				query += " and ";
			}
			
			query += "upper(t.nome_tarefa) like upper ('%" + seletor.getNomeTarefa() + "%')";
			primeiro = false;
		}

		if (seletor.getTipoTarefa() != null) {
			if (primeiro) {
				query += " where ";
			} else {
				query += " and ";
			}
			query += "upper(t.tipo_tarefa) like upper ('%" + seletor.getTipoTarefa() + "%')";
		}

		if (seletor.isRealizado() != null) {
            if (primeiro) {
                query += " where ";
                primeiro = false;
            } else {
                query += " and ";
            }
            query += "t.realizada = " + (seletor.isRealizado() ? 1 : 0);
        }
		return query;

	}

	public int contarTotalDeRegistro(TarefaSeletor seletor) {

		String query = "select t.* from tarefa.tarefas t ";
		Connection conn = Banco.getConnection();
		Statement stmt = Banco.getStatement(conn);
		ResultSet resultado = null;
		int totalRegistros = 0;

		query = incluirFiltros(seletor, query);
		try {
			resultado = stmt.executeQuery(query);
			if (resultado.next()) {
				totalRegistros += resultado.getInt(1);
			}
		} catch (Exception e) {
			System.out.println("ERRO AO CONSULTAR TOTAL DE TAREFAS!");
			System.out.println("ERRO: " + e.getMessage());
		} finally {
			Banco.closeResultSet(resultado);
			Banco.closeStatement(stmt);
			Banco.closeConnection(conn);
		}

		return totalRegistros;
	}

	public int contarPaginas(TarefaSeletor seletor) {
		int totalPaginas = 0;
		int totalRegistros = this.contarTotalDeRegistro(seletor);

		totalPaginas = totalRegistros / seletor.getLimite();
		int resto = totalRegistros % seletor.getLimite();

		if (resto > 0) {
			totalPaginas++;
		}

		return totalPaginas;

	}

	public List<Tarefa> listarTemplates() {
		String query = "SELECT * FROM tarefa.tarefas WHERE is_template = TRUE";
		Connection conn = Banco.getConnection();
		Statement stmt = Banco.getStatement(conn);
		ResultSet resultado = null;
		List<Tarefa> templates = new ArrayList<>();

		try {
			resultado = stmt.executeQuery(query);
			while (resultado.next()) {
				Tarefa tarefa = new Tarefa();
				tarefa.setIdTarefa(resultado.getInt("id_tarefa"));
				tarefa.setNomeTarefa(resultado.getString("nome_tarefa"));
				tarefa.setTipoTarefa(resultado.getString("tipo_tarefa"));
				tarefa.setRealizado(resultado.getBoolean("realizada"));
				tarefa.setIsTemplate(resultado.getBoolean("is_template"));
				templates.add(tarefa);
			}
		} catch (SQLException e) {
			System.out.println("Erro ao listar templates de tarefa.");
			System.out.println("ERRO: " + e.getMessage());
		} finally {
			Banco.closeResultSet(resultado);
			Banco.closeStatement(stmt);
			Banco.closeConnection(conn);
		}
		return templates;
	}

	
	public ArrayList<Tarefa> consultarTarefaAssociadaUmUsuario(int idUsuario) {
		ArrayList<Tarefa> listaTarefas = new ArrayList<Tarefa>();

		String query = "SELECT * FROM tarefa.tarefas where id_usuario =" + idUsuario ;
		Connection conn = Banco.getConnection();
		Statement stmt = Banco.getStatement(conn);
		Tarefa tarefa = null;
		ResultSet resultado = null;

		try {
			resultado = stmt.executeQuery(query);
			while (resultado.next()) {
				tarefa = new Tarefa();
				tarefa.setIdTarefa(resultado.getInt("id_tarefa"));
				tarefa.setNomeTarefa(resultado.getString("nome_tarefa"));
				tarefa.setTipoTarefa(resultado.getString("tipo_tarefa"));
				tarefa.setRealizado(resultado.getBoolean("realizada"));
				ItemTarefaRepository repository = new ItemTarefaRepository();
				tarefa.setItensTarefa(
						repository.consultarTodosOsItensAssociadoUmaTarefa(resultado.getInt("id_tarefa")));
				listaTarefas.add(tarefa);
			}

		} catch (SQLException e) {
			System.out.println("Erro ao consultar todos as tarefas no banco.");
			System.out.println("ERRO: " + e.getMessage());
		}

		return listaTarefas;
	}
	

}