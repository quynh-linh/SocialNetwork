function calculateTime(dateString) {
    // Chuyển đổi chuỗi thành đối tượng Date
    const dateObject = new Date(dateString);

    // Lấy thời gian hiện tại
    const now = new Date();

    // Tính hiệu số thời gian giữa ngày giờ hiện tại và ngày giờ trong chuỗi
    const timeDifference = now - dateObject;

    // Chuyển đổi thời gian từ miligiây sang giây
    const secondsDifference = timeDifference / 1000;

    // Kiểm tra và xử lý hiển thị
    let displayString;

    if (secondsDifference < 60) {
        // Nếu số giây không vượt quá 60, hiển thị số giây
        displayString = `${Math.floor(secondsDifference)} giây`;
    } else if (secondsDifference < 3600) {
        // Nếu số giây không vượt quá 3600 (1 giờ), hiển thị số phút
        displayString = `${Math.floor(secondsDifference / 60)} phút`;
    } else if (secondsDifference < 86400) {
        // Nếu số giây không vượt quá 86400 (1 ngày), hiển thị số giờ
        displayString = `${Math.floor(secondsDifference / 3600)} giờ`;
    } else {
        // Nếu số giây vượt quá 86400, hiển thị số ngày
        const soNgay = Math.floor(secondsDifference / 86400);
        
        // Kiểm tra số ngày vượt quá số ngày trong tháng hay không
        const soNgayTrongThang = new Date(dateObject.getFullYear(), dateObject.getMonth() + 1, 0).getDate();
        
        if (soNgay <= soNgayTrongThang) {
            // Nếu số ngày không vượt quá số ngày trong tháng, hiển thị số ngày
            displayString = `${soNgay} ngày`;
        } else {
            // Nếu số ngày vượt quá số ngày trong tháng, hiển thị số tháng
            const soThang = Math.floor(soNgay / soNgayTrongThang);
            
            if (soThang <= 12) {
                // Nếu số tháng không vượt quá 12, hiển thị số tháng
                displayString = `${soThang} tháng`;
            } else {
                // Nếu số tháng vượt quá 12, hiển thị số năm
                const soNam = Math.floor(soThang / 12);
                displayString = `${soNam} năm`;
            }
        }
    }

    return displayString;
}

export default calculateTime;