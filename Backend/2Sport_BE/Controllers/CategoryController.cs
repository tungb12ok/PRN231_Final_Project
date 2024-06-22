using _2Sport_BE.Repository.Interfaces;
using _2Sport_BE.Repository.Models;
using _2Sport_BE.Service.Services;
using _2Sport_BE.ViewModels;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace _2Sport_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly IProductService _productService;
        private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper;
        public CategoryController(ICategoryService categoryService, IUnitOfWork unitOfWork,
									IProductService productService, IMapper mapper)
        {
            _categoryService = categoryService;
            _productService = productService;
			_unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("list-categories")]
        public async Task<IActionResult> GetCategories()
        {
            try
            {
                var query = await _categoryService.GetAllCategories();
				foreach (var item in query.ToList())
				{
					var product = await _productService.GetProducts(_ => _.CategoryId == item.Id);
					item.Quantity = product.ToList().Count;
				}
				var categories = query.Select(_ => _mapper.Map<Category, CategoryVM>(_)).ToList();
                return Ok(new { total = categories.Count, data = categories });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        [Route("add-categories")]
        public async Task<IActionResult> AddCategories(List<Category> newCategories)
        {
            try
            {
                await _categoryService.AddCategories(newCategories);
                await _unitOfWork.SaveChanges();
                return Ok("Add new sports successfully!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut]
        [Route("update-category")]
        public async Task<IActionResult> UpdateCategory(CategoryUM category)
        {
            try
            {
                var updatedCategory = _mapper.Map<CategoryUM, Category>(category);
                await _categoryService.UpdateCategory(updatedCategory);
                await _unitOfWork.SaveChanges();
                return Ok(updatedCategory);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete]
        [Route("delete-category")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            try
            {
                await _categoryService.DeleteCategoryById(id);
                return Ok("Removed successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
