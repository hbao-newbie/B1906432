import Swal from "sweetalert2";

const swToastInstance = Swal.mixin({
	position: "top-end",
	showConfirmButton: false,
	timer: 3000,
	timerProgressBar: true,
	toast: true,
});

export const swalert = Swal.mixin({
	confirmButtonText: "<i class='fas fa-check'></i> Xác nhận",
	cancelButtonText: "<i class='fas fa-xmark'></i> Hủy bỏ",
});

export const swtoast = {
	fire(config) {
		swToastInstance.fire({
			...config,
			toast: true,
		});
	},

	success(config) {
		swToastInstance.fire({
			icon: "success",
			...config,
			toast: true,
		});
	},

	error(config) {
		swToastInstance.fire({
			icon: "error",
			color: "#f00",
			...config,
			toast: true,
		});
	},
};
