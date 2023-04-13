<script>
export let character;
</script>

<div class="container">
            <div class="form-floating mb-2">
                <input type="text" class="form-control" id="char_name" placeholder="Name" bind:value={character.name}>
                <label for="char_name" class="col-form-label">Name</label>
            </div>
            <div class="form-floating mb-2">
                <input type="text" class="form-control" id="char_species" placeholder="Species" bind:value={character.species}>
                <label for="char_species" class="col-form-label">Species</label>  
            </div>
            <div class="form-floating mb-2">
                <input type="text" class="form-control" id="char_class" placeholder="Class" bind:value={character.class}>
                <label for="char_class" class="col-form-label">Class</label>  
            </div>
            <div class="form-floating mb-2">
                <input type="number" class="form-control" id="char_level" placeholder="Level" bind:value={character.level}>
                <label for="char_level" class="col-form-label">Level</label>
            </div>
</div>