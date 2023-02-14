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
      <input type="text" class="form-control" placeholder="Weapon">
      <label class="col-form-label">Weapon</label>
    </div>
    </div>
    <div class="col">
      <div class="form-floating">
      <input type="text" class="form-control" placeholder="Range">
      <label class="col-form-label">Range</label>
    </div>
    </div>
    <div class="col">
      <div class="form-floating">
      <input type="text" class="form-control" placeholder="Accuracy">
      <label class="col-form-label">Accuracy</label>
    </div>
    </div>
    <div class="col">
      <div class="form-floating">
      <input type="text" class="form-control" placeholder="Damage">
      <label class="col-form-label">Damage</label>
    </div>
    </div>
    <div class="col">
      <div class="form-floating">
      <input type="text" class="form-control" placeholder="Quality">
      <label class="col-form-label">Quality</label>
    </div>
    </div>
  </div>
  {/each}
    <button class="btn btn-outline-secondary" on:click={addTool}>+</button>
</div>
</div>