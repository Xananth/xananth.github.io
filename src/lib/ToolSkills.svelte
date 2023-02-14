<script>
let tools = ['1',]

function addTool() {
  tools.push(tools.length + 1);
  tools = tools;
}

function lessTool() {
  tools.pop();
  tools = tools;
}
</script>

<div class="container text-center">
<div class="input-group">
  <button class="btn btn-outline-secondary" on:click={lessTool}>-</button>
    {#each tools as tool}
      <div class="row">
          <div class="col">
            <div class="form-floating">
              <input type="text" class="form-control" placeholder="Tool" id="tool{tool}">
              <label for="tool{tool}">Tool</label>
            </div>
          </div>
          <div class="col">
            <div class="form-floating">
              <input type="text" class="form-control" placeholder="Experience" id="experience{tool}">
              <label for="experience{tool}">Experience</label>
            </div>
          </div>
          <div class="col">
            <div class="form-floating">
              <input type="text" class="form-control" placeholder="Bonus" id="bonus{tool}">
              <label for="bonus{tool}">Bonus</label>
            </div>
          </div>
      </div>
    {/each}
  <button class="btn btn-outline-secondary" on:click={addTool}>+</button>
</div>
</div>