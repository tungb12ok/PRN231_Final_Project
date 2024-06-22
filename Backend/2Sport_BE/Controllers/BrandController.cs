using _2Sport_BE.DataContent;
using _2Sport_BE.Repository.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using _2Sport_BE.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using _2Sport_BE.Service.Services;
using _2Sport_BE.ViewModels;
using AutoMapper;

namespace _2Sport_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IBrandService _brandService;
        private readonly IProductService _productService;
        private readonly IMapper _mapper;
        public BrandController(IBrandService brandService, IProductService productService, IMapper mapper)
        {
            _brandService = brandService;
            _productService = productService;
            _mapper = mapper;
        }
        [HttpGet]
        [Route("list-all")]
        public async Task<IActionResult> ListAllAsync()
        {
            try
            {
                var result = await _brandService.ListAllAsync();
                foreach (var item in result.ToList())
                {
                    var product = await _productService.GetProducts(_ => _.BrandId == item.Id);
                    item.Quantity = product.ToList().Count;
                }
                return Ok(new { total = result.Count(), data = result });
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPost]
        [Route("add-brand")]
        public async Task<IActionResult> AddBrand(BrandCM brandCM)
        {
            var addedBrand = _mapper.Map<Brand>(brandCM);
            try
            {
                await _brandService.CreateANewBrandAsync(addedBrand);
                return Ok("Add brand successfully!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
