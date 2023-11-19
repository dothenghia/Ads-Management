export default function changeInforForm(){
    return `
    <main class="container rounded-5 bg-white w-50">
    <div class="container">
      <!--!chỗ này phải handle cái href-->
      <button href="/screens/phuong/index.html" class="btn border-0 bg-transparent px-4 mt-3 text-primary" id="backButton" onclick="backButton()"><i
          class="bi bi-arrow-left-square-fill"></i></button>
      <h1 class="bg-transparent text-center fw-bold mb-2" id="AppName">
        AdsMap
      </h1>
      <form action="">
        <div class="container py-3">
          <div class="card border-0">
            <div class="card-body">
              <div class="row">
                <div class="col text-center">
                  <!-- Input file element for image upload -->
                  <input type="file" accept="image/*" id="imageUpload" onchange="displayImage(this)">
                  <!-- Image button to trigger file input -->
                  <label for="imageUpload" style="cursor: pointer;" class="w-100">
                    <img src="/assets/chung/img/person-circle.svg" class="img-thumbnail border-0 p-1" alt="First slide"
                      id="genericAvatar">
                  </label>
                  <br>
                  <small class="p-3">Bấm vào khung trên và chọn file hình ảnh, hoặc kéo thả file hình ảnh vào khung để
                    đổi
                    avatar</small>
                </div>
                <div class="col">
                  <div class="mb-4">
                    <input type="text" class="form-control border-0 border-bottom" name="" id=""
                      aria-describedby="helpId" placeholder="Họ và tên">
                  </div>
                  <div class="mb-4">

                    <input type="text" class="form-control border-0 border-bottom" name="" id=""
                      aria-describedby="helpId" placeholder="Địa chỉ email">

                  </div>
                  <div class="mb-4">

                    <input type="text" class="form-control border-0 border-bottom" name="" id=""
                      aria-describedby="helpId" placeholder="Điện thoại liên lạc">

                  </div>
                  <h5 class="px-2 text-center" id="date">Ngày tháng năm sinh</h5>
                  <div class="container d-flex justify-content-between">
                    <select id="day" name="day" class="w-25">
                      <script>
                        for (let i = 1; i <= 31; i++) {
                          document.write(<option value="${i}">${i}</option>);
                        }
                      </script>
                    </select>
                    <select id="month" name="month" class="w-25">
                      <script>
                        for (let i = 1; i <= 12; i++) {
                          document.write(<option value="${i}">${i}</option>);
                        }
                      </script>
                    </select>
                    <select id="year" name="year" class="w-25">
                      <script>
                        const currentYear = new Date().getFullYear();
                        for (let i = currentYear; i >= currentYear - 100; i--) {
                          document.write(<option value="${i}">${i}</option>);
                        }
                      </script>
                    </select>
                  </div>

                </div>
              </div>

            </div>
            <div class="card-footer text-muted text-center border-0 bg-transparent">
              <a href="#" class="btn btn-primary">Cập nhật thông tin</a>
            </div>
          </div>
        </div>
      </form>

    </div>
  </main>`
}