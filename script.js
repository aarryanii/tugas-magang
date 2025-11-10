// Menunggu sampai semua konten HTML dimuat sebelum menjalankan skrip
document.addEventListener("DOMContentLoaded", () => {
    
    // Panggil fungsi untuk mengambil dan menampilkan produk
    fetchProducts();

});

// Fungsi utama untuk mengambil data dari API
async function fetchProducts() {
    const apiUrl = 'https://fakestoreapi.com/products';
    const productListContainer = document.getElementById('product-list');
    const loadingText = document.getElementById('loading-text');

    try {
        const response = await fetch(apiUrl);
        const products = await response.json();

        // Hapus teks "Memuat produk..." setelah data didapat
        if (loadingText) {
            loadingText.remove();
        }

        // Lakukan loop untuk setiap produk yang didapat dari API
        products.forEach(product => {
            
            // Buat HTML untuk satu kartu produk
            const productCardHtml = `
                <div class="col">
                    <div class="card product-card h-100">
                        <a href="#" class="text-decoration-none text-dark">
                            <img src="${product.image}" class="card-img-top product-image" alt="${product.title}">
                            <div class="card-body">
                                <h5 class="card-title product-title">${product.title}</h5>
                                
                                <p class="card-text product-price">${formatRupiah(product.price)}</p>
                                
                                <p class="card-text product-location">Kota Jakarta Pusat</p> 
                            </div>
                        </a>
                    </div>
                </div>
            `;

            // Masukkan HTML kartu produk ke dalam container
            productListContainer.innerHTML += productCardHtml;
        });

    } catch (error) {
        console.error('Gagal mengambil data produk:', error);
        if (loadingText) {
            loadingText.remove();
        }
        productListContainer.innerHTML = '<p class="text-center text-danger">Gagal memuat produk. Silakan coba lagi nanti.</p>';
    }
}

// Fungsi helper sederhana untuk format harga
function formatRupiah(priceInUSD) {
    // Asumsi kurs 1 USD = 15.000 IDR (contoh saja, bisa disesuaikan)
    const exchangeRate = 15000;
    const priceInIDR = priceInUSD * exchangeRate;
    
    // Format ke "Rp 123.456"
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0 
    }).format(priceInIDR);
}