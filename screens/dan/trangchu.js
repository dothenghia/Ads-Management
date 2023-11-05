// Này thì là cú pháp rút gọn cho mấy cái query element
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $c = document.getElementsByClassName.bind(document);
const $i = document.getElementById.bind(document);

// Import Components
import Button from '/components/chung/Button.js'; // PHẢI DÙNG ĐƯỜNG DẪN TỪ ROOT
import List from '/components/chung/List.js'; // VÀ PHẢI IMPORT DẠNG MODULE
import Header from '/components/chung/Header.js';

// Import Functions
import getReportList from '/functions/dan/getReportList.js';


/* Ta sẽ code theo kiểu OOP
   Đầu tiên là khai báo 1 object có tên là trangchu (Trang chức năng tương ứng)
   Object này sẽ có 4 phương thức chính:
    1. init : Khởi tạo các giá trị ban đầu
    2. fetchData : Lấy dữ liệu từ server
    3. render : Hiển thị dữ liệu lên màn hình
    4. start : Khởi chạy ứng dụng

   Có thể thêm các phương thức khác nếu cần thiết
   Cố gắng tách nhỏ file ra để dễ quản lý nhe
*/

const trangchu = {
    init : function() {
        this.reportList = [];
    },

    fetchData : async function() {
        const data = await getReportList();
        this.reportList = data;
        
        this.render(); // Xong sẽ render ra màn hình
    },

    render : function() {
        $i('root').innerHTML = `
            ${Header()}

            <div class='container'>
                <h1>Trang chủ</h1>

                <div class='py-2'>
                    ${Button('Button 1')}
                    ${Button('Button 2')}
                </div>

                <div class='py-2'>
                    ${List(this.reportList)}
                </div>

            </div>
        `
    },


    start : function() {
        this.init(); // Dô thì sẽ khởi tạo các state trước
        this.fetchData(); // Xong sẽ fetch mấy cái data
        this.render(); // Xong sẽ render ra màn hình
    }
}

trangchu.start();