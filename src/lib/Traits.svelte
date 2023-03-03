<script>
  const DICE_SIZES = ['D4', 'D6', 'D8', 'D10', 'D12', 'D20'];
  const UPSIZES = ['1', 'D4', 'D6', 'D8', 'D10', 'D12', 'D20', '2D12', '3D10', '2D20', '3D12']
</script>

<div class="container">
  <div class="row">
    <div class="col">
      {#each DICE_SIZES.reverse() as size}
          <div class ="input-group mb-2">
            <div class="col">
            <div class="form-floating">
              <select class="form-select" aria-label="Default select example" id="select{size}">
              <option selected></option>
              {#each UPSIZES as upsize}
              <option value="{upsize}">{upsize}</option>
              {/each}
              </select>
              <label for="select{size}">{size}</label>
            </div>
            </div>
            <input type="text" class="form-control" id="char_trait{size}" placeholder="{size}">
          </div>
      {/each}
    </div>
  </div>
</div>
