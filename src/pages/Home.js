import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {

    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);

    const [name, setName] = useState(null);
    const [price, setPrice] = useState(null);
    const [qty, setQty] = useState(null);
    const [categoryId, setCategoryId] = useState(null);


    useEffect(() => { // Load all products in page load
        getProducts();
        getCategories();
    }, [])

    const getProducts = () => {
        fetch("http://localhost:8081/products")
            .then((response) => {
                return response.json();
            }).then((data) => {
                //setting products state
                setProducts(data);
            }).catch((error) => {
                console.log(error);
            })
    }

    const getCategories = () => {
        fetch("http://localhost:8081/categories")
            .then((responce) => {
                return responce.json();
            }).then((data) => {
                setCategories(data);
            }).catch((error) => {
                console.log(error);
            })
    }

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handlePrice = (event) => {
        setPrice(event.target.value);
    }

    const handleQty = (event) => {
        setQty(event.target.value);
    }

    const handleCategory = (event) => {
        setCategoryId(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            "name": name,
            "price": price,
            "qty": qty,
            "categoryId": categoryId
        }

        fetch("http://localhost:8081/products", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((responce) => {
            return responce.json();
        }).then((data) => {
            setProducts([...products, data]);
            setName(null);
            setCategoryId(null);
            setPrice(null);
            setQty(null);
        }).then((error) => {
            console.log(error);
        })
    }


    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Navbar</a>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            {categories && categories.map((category) => (
                                <li class="nav-item">
                                    <Link to={`/categories/${category.id}`} className="nav-link">{category.name}</Link>
                                </li>
                            ))}

                        </ul>
                    </div>
                </div>
            </nav>

            <h1>Home</h1>

            <ul>
                <li>
                    <Link to={"/products"}>Products</Link>
                </li>
            </ul>

            <button onClick={getProducts}>Load Products</button>

            <ol>
                {products && products.map((product) => (
                    <li>
                        <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </li>
                ))}
            </ol>

            <form onSubmit={handleSubmit}>
                <div>
                    <label >Product Name</label>
                    <input type="text" required onChange={handleName} value={name} />
                </div>
                <div>
                    <label>Product Price</label>
                    <input type="text" required onChange={handlePrice} value={price} />
                </div>
                <div>
                    <label>Product Qty</label>
                    <input type="text" required onChange={handleQty} value={qty} />
                </div>
                <div>
                    <label>Category</label>
                    <select required onChange={handleCategory} value={categoryId}>
                        <option>Please Select</option>
                        {categories && categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>

                <button className="btn btn-primary" type="submit">Save Product</button>
            </form>

        </>
    )
}

export default Home;