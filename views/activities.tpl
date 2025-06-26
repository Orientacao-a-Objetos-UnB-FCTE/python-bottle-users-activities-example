%rebase('layout', title='Atividades')

<section>
    <div class="header-actions">
        <h1>Atividades</h1>
        <a href="/activities/add" class="btn btn-primary">Adicionar Atividade</a>
    </div>
    
    % if stats:
    <div class="stats">
        <span>Total: {{stats['total']}}</span>
        <span>Concluídas: {{stats['done']}}</span>
        <span>Pendentes: {{stats['pending']}}</span>
    </div>
    % end
    
    <div class="table-responsive">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Concluída</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                % for a in activities:
                <tr>
                    <td>{{a.id}}</td>
                    <td>{{a.name}}</td>
                    <td>{{a.description}}</td>
                    <td>
                        % if a.done:
                        <span class="badge-success">Sim</span>
                        % else:
                        <span class="badge-warning">Não</span>
                        % end
                    </td>
                    <td class="actions">
                        <form action="/activities/delete/{{a.id}}" method="post" onsubmit="return confirm('Tem certeza?')">
                            <a href="/activities/edit/{{a.id}}" class="btn btn-edit">Editar</a>
                            <button type="submit" class="btn btn-danger">Excluir</button>
                        </form>
                    </td>
                </tr>
                % end
            </tbody>
        </table>
    </div>
</section>