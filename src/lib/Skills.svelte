<script>
const SKILLS = ['Power', 'Speed', 'Forethought', 'Instinct', 'Panache', 'Grace'];
</script>

<div class="container">
    <div class="row ">
        <div class="col">
            {#each SKILLS as skill}
            <div class="form-floating mb-2">
                    <input type="number" class="form-control" id="char_skill{skill}" placeholder="{skill}">
                    <label for="char_skill{skill}">{skill}</label>
            </div>
            {/each}
        </div>
    </div>
</div>