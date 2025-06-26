% rebase('layout', title='Formulário Atividade')

<section class="form-section">
    <h1>{{'Editar Atividade' if activity else 'Adicionar Atividade'}}</h1>
    
    <form action="{{action}}" method="post" class="form-container">
        <div class="form-group">
            <label for="name">Nome:</label>
            <input type="text" id="name" name="name" required 
                   value="{{activity.name if activity else ''}}">
        </div>
        
        <div class="form-group">
            <label for="description">Descrição:</label>
            <textarea id="description" name="description" required>{{activity.description if activity else ''}}</textarea>
        </div>
        
        <div class="checkbox-group">
            <label class="checkbox-item">
                <input type="checkbox" name="done" value="1"
                    % if activity and activity.done:
                        checked
                    % end
                >
                <span>Concluída</span>
            </label>
        </div>
        
        <div class="form-actions">
            <button type="submit" class="btn-submit">Salvar</button>
            <a href="/activities" class="btn-cancel">Voltar</a>
        </div>
    </form>
</section>